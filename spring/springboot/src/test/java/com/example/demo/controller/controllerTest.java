package com.example.demo.controller;


import com.example.demo.mapper.AccoutMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class controllerTest {
  @Autowired
  private AccoutMapper accoutMapper;


  @Test
  public void findByOpen(){
    String num = "19858112019";
    System.out.println(accoutMapper.findByPhone(num));
  }

  @Test
  public void findUsage(){
     System.out.println(accoutMapper.findUsage().get(1).getItemName());
  }
}
