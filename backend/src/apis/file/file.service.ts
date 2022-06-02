import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { getToday } from 'src/common/libraries/utils';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

interface IFile {
  files: FileUpload[];
}

const { GCP_STORAGE_FILENAME, GCP_STORAGE_PROJECTID, GCP_STORAGE_BUCKET } = process.env;

// 스토리지에 이미지 업로드
const storage = new Storage({
  keyFilename: GCP_STORAGE_FILENAME,
  projectId: GCP_STORAGE_PROJECTID,
}).bucket(GCP_STORAGE_BUCKET);

@Injectable()
export class FileService {
  constructor(private readonly userService: UserService) {}

  async upload({ files }: IFile) {
    // 일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    // 구글 스토리지에 동시에 모두 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
            file
              .createReadStream()
              .pipe(storage.file(fname).createWriteStream())
              .on('finish', () => resolve(`${GCP_STORAGE_BUCKET}/${fname}`))
              .on('error', (error) => reject(error));
          }),
      ),
    );

    return results;
  }

  async update({ files, currentUser }) {
    const user = await this.userService.findOne({ email: currentUser.email });

    // 기존 이미지 스토리지 삭제
    if (user.image) {
      await storage.file(user.image.replace(`${GCP_STORAGE_BUCKET}/`, '')).delete();
    }

    // 일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    // 구글 스토리지에 동시에 모두 올리기
    const image = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
            file
              .createReadStream()
              .pipe(storage.file(fname).createWriteStream())
              .on('finish', () => resolve(`${GCP_STORAGE_BUCKET}/${fname}`))
              .on('error', (error) => reject(error));
          }),
      ),
    );

    // 이미지 업데이트
    await this.userService.updateImage({ image, currentUser });

    return image;
  }
}
