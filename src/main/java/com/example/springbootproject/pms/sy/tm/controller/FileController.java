package com.example.springbootproject.pms.sy.tm.controller;

import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class FileController {

    private final MinioStorageService minioStorageService;


    /**
     * 썸네일 조회
     *
     * 1. 기존 로컬 upload/thumb 확인
     * 2. 없으면 MinIO 조회
     */
    @GetMapping("/upload/thumb/{fileName}")
    public ResponseEntity<Resource> getThumbnail(
            @PathVariable String fileName
    ) throws Exception {

        Path localPath =
                Paths.get(
                        "upload",
                        "thumb",
                        fileName
                );


        /*
         * 기존 로컬 파일
         */

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
         * MinIO
         */

        InputStream inputStream =
                minioStorageService.getInputStream(
                        "thumb/" + fileName
                );


        return ResponseEntity.ok()
                .contentType(
                        MediaType.IMAGE_PNG
                )
                .body(
                        new InputStreamResource(
                                inputStream
                        )
                );
    }


    /**
     * 폰트 조회
     */
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
         * 기존 로컬 파일
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
         * MinIO
         */

        InputStream inputStream =
                minioStorageService.getInputStream(
                        "fonts/" + fileName
                );


        return ResponseEntity.ok()
                .contentType(
                        MediaType.parseMediaType(
                                "font/ttf"
                        )
                )
                .body(
                        new InputStreamResource(
                                inputStream
                        )
                );
    }


    /**
     * 사용자 이미지 조회
     */
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


        /*
         * 기존 로컬 파일
         */

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
         * MinIO
         */

        InputStream inputStream =
                minioStorageService.getInputStream(
                        "userimage/" + fileName
                );


        return ResponseEntity.ok()
                .contentType(
                        MediaType.IMAGE_PNG
                )
                .body(
                        new InputStreamResource(
                                inputStream
                        )
                );
    }


    /**
     * 템플릿 이미지 조회
     */
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


        /*
         * 기존 로컬 파일
         */

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
         * MinIO
         */

        InputStream inputStream =
                minioStorageService.getInputStream(
                        "template/" + fileName
                );


        return ResponseEntity.ok()
                .contentType(
                        MediaType.IMAGE_PNG
                )
                .body(
                        new InputStreamResource(
                                inputStream
                        )
                );
    }
}