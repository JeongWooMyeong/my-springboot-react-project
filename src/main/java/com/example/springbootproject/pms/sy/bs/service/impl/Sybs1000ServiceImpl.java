package com.example.springbootproject.pms.sy.bs.service.impl;

import com.example.springbootproject.pms.common.storage.service.MinioStorageService;
import com.example.springbootproject.pms.sy.bs.dto.NoticeFileDto;
import com.example.springbootproject.pms.sy.bs.dto.Sybs1000Dto;
import com.example.springbootproject.pms.sy.bs.service.Sybs1000Service;
import com.example.springbootproject.pms.sy.bs.service.dao.mssql.Sybs1000Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class Sybs1000ServiceImpl implements Sybs1000Service {


    private final Sybs1000Mapper sybs1000Mapper;
    private final MinioStorageService minioStorageService;


    @Override
    public List<Sybs1000Dto> select_list() {

        return sybs1000Mapper.select_list();
    }


    @Override
    public Sybs1000Dto select_one(Long noticeId) {

        Sybs1000Dto dto =
                sybs1000Mapper.select_one(noticeId);

        List<NoticeFileDto> files =
                sybs1000Mapper.selectFiles(noticeId);

        dto.setFiles(files);

        return dto;
    }


    @Override
    @Transactional
    public Long insert(
            Sybs1000Dto dto,
            MultipartFile file
    ) throws Exception {

        sybs1000Mapper.insert(dto);

        Long notice_id = dto.getNotice_id();

        System.out.println("notice_id = " + dto.getNotice_id());

        saveFile(
                notice_id,
                file
        );

        return notice_id;
    }

    @Override
    @Transactional
    public Long update(
            Sybs1000Dto sybs1000Dto,
            MultipartFile file
    ) throws Exception {

        sybs1000Mapper.update(sybs1000Dto);

        Long notice_id =
                sybs1000Dto.getNotice_id();

        saveFile(
                notice_id,
                file
        );

        return notice_id;
    }


    @Override
    public int delete(Long notice_id) {

        return sybs1000Mapper.delete(notice_id);
    }

    @Override
    public List<Sybs1000Dto> selectMainList(){

        return sybs1000Mapper.selectMainList();

    }

    @Override
    public NoticeFileDto select_file(Long fileId){
        return sybs1000Mapper.select_file(fileId);
    }

    //공지사항 파일 업로드 공통 로직
    private void saveFile(
            Long notice_id,
            MultipartFile file
    ) throws Exception {

        if (file == null || file.isEmpty()) {
            return;
        }

        String original_name =
                file.getOriginalFilename();

        String object_name =
                "notice/"
                        + notice_id
                        + "/"
                        + UUID.randomUUID()
                        + "_"
                        + original_name;


        // MinIO 저장
        minioStorageService.upload(
                object_name,
                file.getBytes(),
                file.getContentType()
        );


        // DB 파일 정보 저장
        NoticeFileDto fileDto =
                new NoticeFileDto();

        fileDto.setNotice_id(notice_id);
        fileDto.setOriginal_name(
                original_name
        );
        fileDto.setObject_name(
                object_name
        );
        fileDto.setContent_type(
                file.getContentType()
        );
        fileDto.setFile_size(
                file.getSize()
        );


        sybs1000Mapper.insertFile(
                fileDto
        );
    }

}