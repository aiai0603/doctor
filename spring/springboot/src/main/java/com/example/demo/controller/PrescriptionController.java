package com.example.demo.controller;


import com.example.demo.entity.BaseDrugEntity;
import com.example.demo.entity.ConsultAskEntity;
import com.example.demo.entity.PrescriptionDrugEntity;
import com.example.demo.entity.PrescriptionInfoEntity;
import com.example.demo.mapper.ConsultAskMapper;
import com.example.demo.mapper.DrugMapper;
import com.example.demo.mapper.PrecriptionMapper;
import com.example.demo.repository.PrecriptionInfoRepository;
import com.example.demo.repository.PrescriptionDrugRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;

@RestController
@RequestMapping("prescription")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",maxAge = 3600)
public class PrescriptionController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }
    @Autowired
    PrecriptionMapper precriptionMapper;
    @Autowired
    PrecriptionInfoRepository precriptionInfoRepository;
    @Autowired
    PrescriptionDrugRepository prescriptionDrugRepository;
    @Autowired
    ConsultAskMapper consultAskMapper;
    @Autowired
    DrugMapper drugMapper;

    /**
     * 通过状态信息和复诊配药id返回所有的处方
     * @param status
     * @param consult
     * @return
     */
    @GetMapping("showAll")
    public ResponseData showPrescription(@RequestParam("status") String status,@RequestParam("consult") Integer consult){
        List<PrescriptionInfoEntity> list1 = precriptionMapper.findByConsultStatus(consult,status);
        List precription = new ArrayList();
        int length1 = precriptionMapper.findByConsultStatus(consult,"0").size();
        int length2 = precriptionMapper.findByConsultStatus(consult,"1").size();
        Map<String,Object> map = new HashMap<>();
        for (int i=0;i<list1.size();i++){
            List<PrescriptionDrugEntity> list2 = precriptionMapper.findDrugByPrescription(list1.get(i).getPrescriptionId());
            Map<String,Object> map1 = new HashMap<>();
            map1.put("prescriptionId",list1.get(i).getPrescriptionId());
            map1.put("prescriptionType",list1.get(i).getPrescriptionType());
            map1.put("createTime",list1.get(i).getCreateTime());
            map1.put("prescriptionDrug",list2);
            precription.add(map1);
        }
        map.put("NoSubmit","待提交("+length1+")");
        map.put("Submit","已提交("+length2+")");
        map.put("prescription",precription);
        return new ResponseData(ExceptionMsg.SUCCESS,map);
    }

    /**
     * 添加药方
     * @param map1
     * @return
     */
    @PostMapping("addPrescription")
    public ResponseData addPrescription(@RequestBody Map<String,Object> map1){
        Integer consultId = Integer.parseInt((String) map1.get("consultId"));
        String type = (String)map1.get("type");
        String info;
        if(type.equals("西药")){
            info = "1";
        }
        else if(type.equals("中成药")){
            info = "2";
        }
        else{
            info = "3";
        }
        Date time = new Date();
        ConsultAskEntity consult = consultAskMapper.findByConsult(consultId);
        PrescriptionInfoEntity prescriptionInfoEntity = new PrescriptionInfoEntity();
        prescriptionInfoEntity.setPrescriptionType(info);
        prescriptionInfoEntity.setConsultId(consultId);
        prescriptionInfoEntity.setCreateTime(new Timestamp(time.getTime()));
        prescriptionInfoEntity.setDoctorId(consult.getDoctorId());
        prescriptionInfoEntity.setDoctorName(consult.getDoctorName());
        prescriptionInfoEntity.setUserId(consult.getCreateUserId());
        prescriptionInfoEntity.setPrescriptionStatus("0");
        precriptionInfoRepository.save(prescriptionInfoEntity);
        return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
    }

    /**
     * 提交药方
     * @param map1
     * @return
     */
    @PostMapping("submit")
    public ResponseData submitPrescription(@RequestBody Map<String,Object> map1){
         int id = (int) map1.get("prescriptionId");
         if(precriptionMapper.findDrugByPrescription(id).size()==0){
             return new ResponseData(ExceptionMsg.FAILED,"药品不能为空");
         }
         precriptionMapper.submit(id);
         return new ResponseData(ExceptionMsg.SUCCESS,"操作成功");
    }

    /**
     * 删除药方
     * @param map1
     * @return
     */
    @PostMapping("deletePrescription")
    public ResponseData deletePrecription(@RequestBody Map<String,Object> map1){
        int id = (int) map1.get("prescriptionId");
        if(precriptionMapper.findDrugByPrescription(id).size()!=0){
            return new ResponseData(ExceptionMsg.FAILED,"请先删除药品");
        }
        precriptionMapper.deletePrescription(id);
        return new ResponseData(ExceptionMsg.SUCCESS,"删除成功");
    }

    /**
     * 删除药方中的药品
     * @param map1
     * @return
     */
    @PostMapping("deleteDrug")
    public ResponseData deleteDrug(@RequestBody Map<String,Object> map1){
        int id = (int) map1.get("prescriptionDrugId");
        precriptionMapper.deleteDrug(id);
        return new ResponseData(ExceptionMsg.SUCCESS,"删除成功");
    }

    /**
     * 向药方中添加药品
     * @param prescriptionDrugEntity
     * @return
     */
    @PostMapping("addDrug")
    public ResponseData addDrug(@RequestBody PrescriptionDrugEntity prescriptionDrugEntity){
        try{
            BaseDrugEntity drugEntity = drugMapper.findByDrugId(prescriptionDrugEntity.getDrugId());
            prescriptionDrugEntity.setDose(drugEntity.getDose().multiply(prescriptionDrugEntity.getDose()));
            prescriptionDrugRepository.save(prescriptionDrugEntity);
            return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch(Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 查看复诊配药的电子处方
     * @param consult
     * @return
     */
    @GetMapping("showPrescription")
    public ResponseData showPrecription(@RequestParam(value = "consult",defaultValue = "")Integer consult){
        if(consult==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入数据为空");
        }
        List list = new ArrayList();
        Double sum =0.0;
        try{
            List<PrescriptionInfoEntity> prescriptionInfo = new ArrayList<>();
            prescriptionInfo = precriptionMapper.findByConsultDoctor(consult,"1");
            for (int i=0;i<prescriptionInfo.size();i++){
                Map<String,Object> map1 = new HashMap<>();
                List<PrescriptionDrugEntity> prescriptionDrugList =
                        precriptionMapper.findDrugByPrescription(prescriptionInfo.get(i).getPrescriptionId());
                ConsultAskEntity consultAskEntity = consultAskMapper.findByConsult(prescriptionInfo.get(i).getConsultId());
                map1.put("consult",consultAskEntity);
                map1.put("drug",prescriptionDrugList);
                for (int j=0;j<prescriptionDrugList.size();j++){
                    Double price = Double.parseDouble(String.valueOf(prescriptionDrugList.get(j).getPrice()));
                    Double index = Double.parseDouble(String.valueOf(prescriptionDrugList.get(j).getQuantity()));
                    sum+=price*index;
                }
                map1.put("sum",sum);
                map1.put("index","处方"+(i+1));
                String type = "";
                if(prescriptionInfo.get(i).getPrescriptionType().equals("1")){
                    type = "普通西药方";
                }
                else if(prescriptionInfo.get(i).getPrescriptionType().equals("2")){
                    type = "普通中成药";
                }
                else {
                    type = "普通中草药";
                }
                map1.put("type",type);
                list.add(map1);
            }
            return new ResponseData(ExceptionMsg.SUCCESS,list);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }
}
