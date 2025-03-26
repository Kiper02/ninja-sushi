import {
    S3Client,
    PutObjectCommandInput,
    PutObjectCommand,
    GetObjectCommandInput, GetObjectCommand, DeleteObjectCommandInput, DeleteObjectCommand
} from "@aws-sdk/client-s3";
import configUtil from "#shared/utils/config.util";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

class S3Service {
    private readonly client: S3Client;
    private readonly bucket: string;

    public constructor() {
        this.client = new S3Client({
            endpoint: configUtil('S3_ENDPOINT'),
            region: configUtil('S3_REGION'),
            credentials: {
                accessKeyId: configUtil('S3_KEY_ID'),
                secretAccessKey: configUtil('S3_KEY_SECRET'),
            },
        });
        this.bucket = configUtil('S3_BUCKET_NAME');
    }

    public async upload(buffer: Buffer, key: string, mimetype: string) {
        const command: PutObjectCommandInput = {
            Bucket: this.bucket,
            Key: String(key),
            Body: buffer,
            ContentType: mimetype,
        };

        try {
            await this.client.send(new PutObjectCommand(command));
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: "Не удалось загрузить файл в s3 хранилище",
            });
        }
    }

    public async remove(key: string) {
        const command: DeleteObjectCommandInput = {
            Bucket: this.bucket,
            Key: String(key),
        };

        try {
            await this.client.send(new DeleteObjectCommand(command));
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: "Не удалось удалить файл из s3 хранилища",
            });
        }
    }


    public async findLink(key: string) {
        const command: GetObjectCommandInput = {
            Bucket: this.bucket,
            Key: String(key),
        }

        try {
            return await getSignedUrl(this.client, new GetObjectCommand(command))
        } catch (error) {
            throw createError({
                statusCode: 500,
                message: "Не удалось получить файл из s3 хранилища",
            });
        }
    }


}

export default new S3Service();
