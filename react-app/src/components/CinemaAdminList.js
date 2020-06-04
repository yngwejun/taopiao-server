import React from "react";
import {connect} from "react-redux";
import alert from "../utils/alert";
import {store} from "../index";
import {getCinemaAdminPageInfo, receiveCinemaAdmins} from "../actions";
import {queryList, queryPageInfo} from "../actions/pageInfo";
import {getCinemaAdminPage} from "../apis/data";
import * as API from "../apis/api";
import $ from "jquery";
import {DEFAULT_START_PAGE} from "../constants/const";
import dateTimeUtil from "../utils/dateTimeUtil";
class CinemaAdminList extends React.Component{

    handleClickSpanNumber=(e)=>{
        console.log('--page span number-',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML==this.props.pageInfo.currentPage){
            alert("已经是第"+e.currentTarget.innerHTML+"页")
        }else {
            //先判断是否是查询状态1
            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
            }else getCinemaAdminPage(API.cinemaAdminPageApi, e.currentTarget.innerHTML, this.props.pageInfo.pageSize)

        }
    }
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else{
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,DEFAULT_START_PAGE, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,DEFAULT_START_PAGE, this.props.pageInfo.pageSize)))

                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,1,this.props.pageInfo.pageSize)
                }
            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else{
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)
                }
            }
        }
    }
    //处理上一页和下一页
    handleClickPreAndNext=(e)=>{
        // console.log('-----------pre  nex---',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML==="&lt;&lt;"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            }else {
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)
                }
            }

        }
    }
    //渲染当页的菜单
    handleChangePage=(item)=>{
        if (item===this.props.pageInfo.currentPage){
            return {backgroundColor:"#80000d",color:"#ffffff",padding:"6px 10px"}
        }else return {padding:"6px 10px"}
    }
    //条件渲染的分页
    doRenderForPage=()=>{
        let arr=[];
        let t=this.props.pageInfo.currentPage;
        let tp=this.props.pageInfo.totalPage;

        console.log('-----',this.props.pageInfo.totalPage)

        if (tp<=8){
            for (let i=1;i<=tp;i++){
                arr.push(i)
            }
            return arr.map(item=> <span className={"pageSpan"}><a
                style={this.handleChangePage(item)}
                onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
        }else if (11>=tp>8){

            if ((tp/2)>t){
                arr=[1,2,3,4,5,6,7,8]
                return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                    onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
            }else {
                arr=[4,5,6,7,8,9,10,11]
                return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                    onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)}
        }else if (tp>11){
            if ((tp/2)>=t){

                if (t>=3){
                    arr=[t-2,t-1,t,t+1,t+2,t+3,t+4,t+5]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[1,2,3,4,5,6,7,8]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }
            }else if ((tp/2)<t){


                if (tp-2>=t){
                    arr=[t-5,t-4,t-3,t-2,t-1,t,t+1,t+2]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[tp-7,tp-6,tp-5,tp-4,tp-3,tp-2,tp-1,tp]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }
            }

        }

    }
//    调整页面大小并且制定加载的页面信息
    handleClickSize=()=>{
        let size=$("#modifyPageSize").val();
        let match =/[0-9]$/;
        if (match.test(size)) {
            if (size>this.props.pageInfo.totalCount){
                alert("已超出总的记录数，或请刷新");
                return;
            }
            if (size<5){
                alert("规定每一页的大小不能小于5条记录！！！！请重新输入")
                return;
            }

            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,DEFAULT_START_PAGE, size)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,DEFAULT_START_PAGE, size)))
            }else {
                getCinemaAdminPage(API.cinemaAdminPageApi,DEFAULT_START_PAGE,size)
            }



        }else alert("请输入数字")
    }
    handleClickToPage=()=>{
        let page=$("#gotoPage").val();
        let size=this.props.pageInfo.pageSize

        let match =/[0-9]$/;
        if (match.test(page)) {
            if (page>this.props.pageInfo.totalPage){
                alert("已超出最大页面，请刷新刷新页面！")
                return;
            }if (page<=0){
                alert("没有这个页面")
                return;
            }
            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,page, size)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,page, size)))
            }else {
                getCinemaAdminPage(API.cinemaAdminPageApi,page,size)
            }
        }else alert("请输入数字")

    }
    render() {
        const title=this.props.Columns.map(
            column=><th key={column.dataIndex}>{column.title}</th>
        )
        const columnLength=this.props.Columns.length;
        // console.log('----columnLength--',columnLength);


        const tableStyle={
            margin:'0 auto',
            borderCollapse:'collapse',
            borderSpacing:'0',

        }

        const myDatasource=this.props.DataSource;
        let key= 0;
        let myList= myDatasource.map(data=><tr  key={data.cinema_admin_id}>



                <td>{data.cinema_admin_id}</td>
                <td>{data.nick_name}</td>
                <td>{data.phone}</td>
                <td>{data.real_name}</td>
                <td>{dateTimeUtil(data.birth)}</td>
            <td>{data.sex}</td>
                <td>{(data.avatar==null||data.avatar=='null'||data.avatar=='')?<img src={''} width={'50px'} height={'60px'}
                                                                  style={{opacity:'0'}}/>:<img src={data.avatar} width={'50px'} height={'60px'}/>}</td>



            </tr>
        )
      return <div style={tableStyle}>
           <table id={"readListTable"}>

               <thead> {title}</thead>
               <tbody>
               {myList}
               </tbody>
           </table>
           {/********************************分页信息**************************************/}
           <div className={'page'}>
               <span className={"count"}>共有 <span className={"countStyle"}>{this.props.pageInfo.totalCount}</span> 条记录</span>
               <span className={"count"}>共有 <span className={"countStyle"}> {this.props.pageInfo.totalPage}</span> 页</span>
               <span className={"count"}>本页 <span className={"countStyle"}> {myDatasource.length}</span> 条数据</span>
               <span className={"sheZhiWrap"}  style={{position:"relative"}}>
                <span id={"tzSpan"} style={{position:"absolute"}}>跳转至</span>
                <img className={"sheZhiBtn"} align={"AbsBottom"} src={require("../imges/tiaozhuan.png")} onClick={()=>this.handleClickToPage()}/>


            </span>
               <span  className={"to"}>至<input id={"gotoPage"} defaultValue={this.props.pageInfo.currentPage}/>页</span>
               <span className={"size"}>大小<input id={"modifyPageSize"} defaultValue={this.props.pageInfo.pageSize}/></span>
               <span className={"sheZhiWrap"}  style={{position:"relative"}}>
                <span id={"tiShiSpan"} style={{position:"absolute"}}>点击设置每页最大记录数！！！</span>
                <img className={"sheZhiBtn"} align={"AbsBottom"} src={require("../imges/shezhi.png")} onClick={()=>this.handleClickSize()}/>


            </span>
               <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>首页</a></span>
               <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{"<<"}</a></span>
               {this.doRenderForPage()}
               <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{">>"}</a></span>
               <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>尾页</a></span>
           </div>
       </div>
    }
}
const mapStateToProps=state=>({
    pageInfo:state.cinemaAdminPageInfo,
    queryStatusCinemaAdmin: state.queryStatusCinemaAdmin,
    queryCinemaAdminList: state.queryCinemaAdminList

})
export default connect(mapStateToProps) (CinemaAdminList);