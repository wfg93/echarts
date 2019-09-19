//import {apiServer} from '@/utils/api.service'
//import {baseURL} from "../config"
import {apiServe} from "../api.server";


import {commonManageUrl} from  '../common/config.js'

import {emergency} from '../common/config'

import {Feedbackdata} from '../common/config'

//这个接口是这样的 /edata/lookUserShop
const spellCar = (url,type='post') => (params) => apiServe[type](commonManageUrl+url,params)
//这个接口是这样的 '/edata/look
const exigency = (url,type='post') => (params) => apiServe[type](emergency+url,params)
//这个接口是这样的 /edata/userReport
const complaints =(url,type='post') => (params) => apiServe[type](Feedbackdata+url,params)

//总商号中、自然自营的的数量
export const Number = spellCar('Number')
//总商号中、自然自营的占比
//export const Number =spellCar('Number')
//总商号中自然、自营用户增长趋势
export  const Polyline = spellCar('Polyline')
//商号市场推广、网络推广百分比图
export  const PromotionPercentage = spellCar('PromotionPercentage')
//商号市场推广、网络推广折线图
export const PromotionPolyline =spellCar('PromotionPolyline')
//商号类别占比
export const StylePercentage = spellCar('StylePercentage')
//企业类别占比
export const BusinessNameNumber= spellCar('BusinessNameNumber')
//各行业开通的商号类别柱状图
export const StyleAndBusinessName =spellCar('StyleAndBusinessName')
//紧急数据
export  const UserUrgentNumber = exigency('UserUrgentNumber')
//用户反馈数据(投诉)
export const Complaint = complaints('Complaint')
//用户反馈数据(举报)
export const Report = complaints('Report')
//最近七天访问预注册量
export const UserUrgentNumberColumnar = exigency('UserUrgentNumberColumnar')
//地主注册量
export const UserAdressNumber = exigency('UserAdressNumber')












// 默认是post请求,还可以是get,del,put,patch请求
const EData = (url, type = 'post') => (params) => apiServer[type](baseURL + url,params)

/** 等价于（函数柯里化）
    function EData (url,type = 'post'){
        return function(params){
            return apiServer[type](baseURL + url,params)
        }
    }
*/

//  主页
export const dashboard = {
    getLists:EData('/...')
}

// 注册数据
export const registerData = {
    
}

//
// 认证数据
export const completeData = {
    
}

// 商号数据
export const shopData = {
    
}

// 终端数据
export const terminalData = {
    
}

// 紧急数据
export const exigenceData = {
    
}

//  用户反馈咨询
export const counselData = {
    
}
