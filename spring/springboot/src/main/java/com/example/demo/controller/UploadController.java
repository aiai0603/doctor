package com.example.demo.controller;


import com.example.demo.repository.ConsultAskRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.example.demo.utils.QiniuUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UploadController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }
    @Autowired
    ConsultAskRepository consultAskRepository;

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public ResponseData uploadFile(@RequestParam("file") MultipartFile[] file){
        if (file==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
            List<String> list = new ArrayList<>();
            for (int i=0;i<file.length;i++){
                String url = QiniuUpload.uploadFile(file[i]);
                list.add(url);
            }
            System.out.println(list);
            return new ResponseData(ExceptionMsg.SUCCESS,list);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }
}
