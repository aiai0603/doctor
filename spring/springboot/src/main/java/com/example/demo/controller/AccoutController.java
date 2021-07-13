package com.example.demo.controller;

import com.example.demo.mapper.AccoutMapper;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("accout")
public class AccoutController {
   protected Response result(ExceptionMsg msg){
      return new Response(msg);
   }
   protected Response result(){
      return new Response();
   }
   @Autowired
   private AccoutMapper accoutMapper;

   @GetMapping("login")
   public ResponseData loginByopen(String open){
      open ="12345678911";
      if(accoutMapper.findByOpen(open)!=null){
         return new ResponseData(ExceptionMsg.FIND,accoutMapper.findByOpen(open));
      }
      else{
         return new ResponseData(ExceptionMsg.FAILED,accoutMapper.findByOpen(open));
      }
   }


}
