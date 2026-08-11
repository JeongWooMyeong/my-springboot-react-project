package com.example.springbootproject.pms.sy.tm.controller;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class FileController {

    private final MinioClient minioClient;

    @Value("${storage.bucket}")
    private String bucketName;


    /**
     * 썸네일 조회
     *
     * 1. 기존 로컬 upload/thumb 확인
     * 2. 없으면 MinIO에서 조회
     */
    @GetMapping("/upload/thumb/{fileName}")
    public ResponseEntity<Resource> getThumbnail(
            @PathVariable String fileName
    ) throws Exception {

        /*
         * 1. 기존 로컬 파일 확인
         */
        Path localPath =
                Paths.get(
                        "upload",
                        "thumb",
                        fileName
                );

        if (Files.exists(localPath)) {

            String contentType =
                    Files.probeContentType(localPath);

            if (contentType == null) {
                contentType =
                        MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(
                            MediaType.parseMediaType(
                                    contentType
                            )
                    )
                    .body(
                            new InputStreamResource(
                                    Files.newInputStream(
                                            localPath
                                    )
                            )
                    );
        }


        /*
         * 2. 로컬에 없으면 MinIO 조회
         */
        InputStreamResource resource =
                new InputStreamResource(
                        minioClient.getObject(
                                GetObjectArgs.builder()
                                        .bucket(bucketName)
                                        .object(
                                                "thumb/"
                                                        + fileName
                                        )
                                        .build()
                        )
                );


        /*
         * 3. 이미지 반환
         */
        return ResponseEntity.ok()
                .contentType(
                        MediaType.IMAGE_PNG
                )
                .body(resource);
    }

    @GetMapping("/upload/fonts/{fileName}")
    public ResponseEntity<Resource> getFont(
            @PathVariable String fileName
    ) throws Exception {

        Path localPath =
                Paths.get(
                        "upload",
                        "fonts",
                        fileName
                );

        /*
         * 1. 기존 로컬 파일 확인
         */
        if (Files.exists(localPath)) {

            String contentType =
                    Files.probeContentType(localPath);

            if (contentType == null) {
                contentType =
                        "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(
                            MediaType.parseMediaType(
                                    contentType
                            )
                    )
                    .body(
                            new InputStreamResource(
                                    Files.newInputStream(
                                            localPath
                                    )
                            )
                    );
        }


        /*
         * 2. 없으면 MinIO 조회
         */
        InputStreamResource resource =
                new InputStreamResource(
                        minioClient.getObject(
                                GetObjectArgs.builder()
                                        .bucket(bucketName)
                                        .object(
                                                "fonts/"
                                                        + fileName
                                        )
                                        .build()
                        )
                );


        return ResponseEntity.ok()
                .contentType(
                        MediaType.parseMediaType(
                                "font/ttf"
                        )
                )
                .body(resource);
    }

    @GetMapping("/upload/userimage/{fileName}")
    public ResponseEntity<Resource> getUserImage(
            @PathVariable String fileName
    ) throws Exception {

        Path localPath =
                Paths.get(
                        "upload",
                        "userimage",
                        fileName
                );

        // 기존 로컬 파일
        if (Files.exists(localPath)) {

            String contentType =
                    Files.probeContentType(localPath);

            if (contentType == null) {
                contentType =
                        MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(
                            MediaType.parseMediaType(contentType)
                    )
                    .body(
                            new InputStreamResource(
                                    Files.newInputStream(localPath)
                            )
                    );
        }

        // MinIO
        InputStreamResource resource =
                new InputStreamResource(
                        minioClient.getObject(
                                GetObjectArgs.builder()
                                        .bucket(bucketName)
                                        .object(
                                                "userimage/"
                                                        + fileName
                                        )
                                        .build()
                        )
                );

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }

    @GetMapping("/upload/template/{fileName}")
    public ResponseEntity<Resource> getTemplateImage(
            @PathVariable String fileName
    ) throws Exception {

        Path localPath =
                Paths.get(
                        "upload",
                        "template",
                        fileName
                );

        // 기존 로컬 파일
        if (Files.exists(localPath)) {

            String contentType =
                    Files.probeContentType(localPath);

            if (contentType == null) {
                contentType =
                        MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(
                            MediaType.parseMediaType(
                                    contentType
                            )
                    )
                    .body(
                            new InputStreamResource(
                                    Files.newInputStream(
                                            localPath
                                    )
                            )
                    );
        }

        // MinIO
        InputStreamResource resource =
                new InputStreamResource(
                        minioClient.getObject(
                                GetObjectArgs.builder()
                                        .bucket(bucketName)
                                        .object(
                                                "template/"
                                                        + fileName
                                        )
                                        .build()
                        )
                );

        return ResponseEntity.ok()
                .contentType(
                        MediaType.IMAGE_PNG
                )
                .body(resource);
    }

}