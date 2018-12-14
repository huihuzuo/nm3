<template>
  <div class="detail-history-wrap">
    <video src="/static/mp4/video2.mp4" width="400" height="400" autoplay loop="loop"></video>
      <div class="detail-history-wrap-tab" style="border-bottom: 1px  #1F7393 solid;">
        <span class="title-all title-speed" @click="clickEvent('speed')">路况</span>
        <span class="title-all title-weather" @click="clickEvent('weather')">气象</span>
        <span class="title-all title-event" @click="clickEvent('event')">事件</span>
        <span class="title-all title-lx" @click="clickEvent('lx')">路线</span>
        <span class="title-all title-gzw" @click="clickEvent('gzw')">构筑物</span>
        <span class="title-all title-yxss" @click="clickEvent('yxss')">沿线设施</span>
        <span class="detail-history-close" @click="queryHistory('close')">X</span>
      </div>
      <div class="detail-history-wrap-content">
        <div class="detail-history-wrap-tab-content speed">
          <div style="height:40px; line-height: 40px;  color: #FFF; margin-left: 41px;">当前路段拥堵时空图：</div>
          <div class="speed-box"><img style="margin: 10px 33px 26px;" src="../../static/images/roadnet.png"></div>
          <div class="speed-box">
            <div class="weatherVal" style="display: block;">当前路段前后路况：</div>
            <div id="line1" class="circle-wrap-main"></div>
          </div>
          <div class="speed-box">
            <div class="weatherVal" style="display: block;">当天路段路况：</div>
            <div id="line2" class="circle-wrap-main"></div>
          </div>
        </div>
        <div class="detail-history-wrap-tab-content weather">
          <span style="height:40px; line-height: 40px; display: inline-block; float:left; color: #FFF; margin-left: 41px;">当前路段气象时空图</span>
          <span class="detail-history-wrap-tab-select" style="float: right; margin-right: 50px; margin-top: 20px;">
        <select id="showWeather" @change="clickEvent('isWeather')">
          <option value="1" selected = "selected">能见度</option>
          <option value="2">降水</option>
          <option value="3">风</option>
          <option value="4">温度</option>
        </select>
      </span>
          <div class="speed-box">
            <img class="skt1" style="margin: 13px 33px 26px;" src="../../static/images/weather3.png">
            <img class="skt2" style="margin: 13px 33px 26px; display: none;" src="../../static/images/weather4.png">
          </div>
          <div class="speed-box">
            <div class="weatherVal 1">当前路段能见度：</div>
            <div class="weatherVal 2">当前路段降水</div>
            <div class="weatherVal 3">当前路段风速</div>
            <div id="line3" class="circle-wrap-main"></div>
          </div>
          <div class="speed-box">
            <div class="weatherVal 1">当前路段能见度</div>
            <div class="weatherVal 2">当前路段降水</div>
            <div class="weatherVal 3">当前路段风速</div>
            <div id="line4" class="circle-wrap-main"></div>
          </div>
        </div>
        <div class="detail-history-wrap-tab-content event">
          <select style="float: right; margin: 15px 20px;">
            <option>沿线5公里事件</option>
            <option>周边5公里事件</option>
          </select>
          <div class="event-title">沿线5公里发生的事件：</div>
          <div class="event-content" @click="changeEvent('hy')"><span>行业：</span><span>事件</span><span>1</span><span>起</span></div>
          <div class="event-content" @click="changeEvent('gd')"><span>高德：</span><span>管制</span><span>2</span><span>起</span></div>
          <div class="event-list-dialog gd">
            <span style="width: 50%; height: 30px; line-height: 30px; color: #5194ae; cursor:pointer; overflow: hidden; display: inline-block; float: left; padding: 0 32px;">船形山路因施工封路：船形山路东向西因施工封路，2017年07月29日到2017年08月20日，前往陕山步行街萍钢的车辆可绕行漳大线-钢城路或经320国道-昌盛大道-萍钢</span>
            <span style="width: 50%; height: 30px; line-height: 30px; color: #5194ae; cursor:pointer; overflow: hidden; display: inline-block; float: left; padding: 0 32px;">船形山路因施工封路：船形山路西向东因施工封路，2017年07月29日到2017年08月20日，前往陕山步行街萍钢的车辆可绕行漳大线-钢城路或经320国道-昌盛大道-萍钢</span>
          </div>
          <div class="event-list-dialog hy">
            <span style="width: 50%; height: 30px; line-height: 30px; color: #5194ae; cursor:pointer; overflow: hidden; display: inline-block; float: left; padding: 0 32px;">大广高速龙杨段3144KM+820M东幅（往赣州方向）多车连环相撞、事故现场有路损、有路堵、4人重伤、路政人员、清障、交警在事故现场处理</span>
          </div>
          <div class="detail-wrap-content-ss">
            <ul>
              <li class="eventDetail gd">
                <span class="detail-wrap-item">事件名称:</span><span class="detail-wrap-item">船形山路因施工封路：船形山路东向西因施工封路，2017年07月29日到2017年08月20日，前往陕山步行街萍钢的车辆可绕行漳大线-钢城路或经320国道-昌盛大道-萍钢</span>
                <span class="detail-wrap-item">阻断开始时间:</span><span class="detail-wrap-item">2017-10-18</span>
                <span class="detail-wrap-item">阻断结束时间:</span><span class="detail-wrap-item">2017-10-20</span>
              </li>
              <li class="eventDetail hy">
                <span class="detail-wrap-item">行政区划列表:</span><span class="detail-wrap-item">360800</span>
                <!-- <span class="detail-wrap-item">路线编码:</span><span class="detail-wrap-item">G72</span>
                 <span class="detail-wrap-item">路线名称:</span><span class="detail-wrap-item">泉南高速</span>-->
                <span class="detail-wrap-item">起点桩号:</span><span class="detail-wrap-item">473</span>
                <span class="detail-wrap-item">止点桩号:</span><span class="detail-wrap-item">474</span>
                <span class="detail-wrap-item">上下行方向:</span><span class="detail-wrap-item">上行</span>
                <span class="detail-wrap-item">阻断原因分类编码:</span><span class="detail-wrap-item">143</span>
                <span class="detail-wrap-item">阻断类型:</span><span class="detail-wrap-item">突发性nbsp;事故灾难nbsp;车辆故障</span>
                <span class="detail-wrap-item">更新时间:</span><span class="detail-wrap-item">2017-8-20</span>
                <span class="detail-wrap-item">受阻路段:</span><span class="detail-wrap-item">老营盘2号隧道</span>
                <span class="detail-wrap-item">现场描述:</span><span class="detail-wrap-item">11:44分，G72泉南高速石吉段K473+100公桩处老营盘2号隧道（石城往吉安方向）一辆商务车因故障停在隧道口，已封闭行车道。</span>
                <span class="detail-wrap-item">发生时间:</span><span class="detail-wrap-item">2017-8-18</span>
                <span class="detail-wrap-item">预计恢复时间:</span><span class="detail-wrap-item">2017-10-18</span>
                <span class="detail-wrap-item">实际恢复时间:</span><span class="detail-wrap-item">2017-10-20</span>
                <span class="detail-wrap-item">中间点坐标:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">是否删除:</span><span class="detail-wrap-item">未删除</span>
                <span class="detail-wrap-item">现场图片:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">道路是否中断:</span><span class="detail-wrap-item">否</span>
                <span class="detail-wrap-item">里程桩路链串:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">匹配里程桩的时间:</span><span class="detail-wrap-item">2017-10-19</span>
                <span class="detail-wrap-item">路段名称:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">处置措施名称:</span><span class="detail-wrap-item">半幅封闭半幅单向通行</span>
                <span class="detail-wrap-item">路基数量:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">路基金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">路面数量:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">路面金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">桥梁:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">桥梁金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">涵洞:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">涵洞金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">防护工程:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">防护工程金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">其他金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">累计金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">伤（人）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">死（人）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">滞留人员（人）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">毁坏车辆（辆）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">滞留车辆（辆）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">坍塌方（m3/处）:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">堵塞长度（km）:</span><span class="detail-wrap-item">1</span>
                <span class="detail-wrap-item">坍塌金额:</span><span class="detail-wrap-item">0</span>
                <span class="detail-wrap-item">是否预警:</span><span class="detail-wrap-item">新增</span>
                <span class="detail-wrap-item">是否解除:</span><span class="detail-wrap-item">未解除</span>
                <span class="detail-wrap-item">影响邻省行政区划ID:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">填报人ID:</span><span class="detail-wrap-item">402881e730a9ebe40130aa6500ce7eff</span>
                <span class="detail-wrap-item">填报人联系电话:</span><span class="detail-wrap-item">13317068601</span>
                <span class="detail-wrap-item">传真:</span><span class="detail-wrap-item">0791-85801806</span>
                <span class="detail-wrap-item">其他阻断原因:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">其他处置措施:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">上报单位名称:</span><span class="detail-wrap-item">江西省高速公路投资集团有限责任公司泰和管理中心</span>
                <span class="detail-wrap-item">所属行政区划:</span><span class="detail-wrap-item">36</span>
                <span class="detail-wrap-item">单向或双向:</span><span class="detail-wrap-item">双向</span>
                <span class="detail-wrap-item">阻断类型:</span><span class="detail-wrap-item">普通路况</span>
                <span class="detail-wrap-item">桥梁或隧道ID:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">阻断影响里程:</span><span class="detail-wrap-item">1000</span>
                <span class="detail-wrap-item">恢复情况:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">删除原因:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">阻断事件类别:</span><span class="detail-wrap-item"></span>
                <span class="detail-wrap-item">阻断预警级别：</span><span class="detail-wrap-item">重大类</span>
                <span class="detail-wrap-item">技术等级key:</span><span class="detail-wrap-item">10</span>
                <span class="detail-wrap-item">面层类型key:</span><span class="detail-wrap-item">11</span>
              </li>
            </ul>
          </div>
          <div class="eventDetail"></div>
        </div>
        <div class="detail-history-wrap-tab-content jdz" style="height:248px;">
          <div class="layers-list-detail-list fwq">
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522143392833891600000037100000')">墨山大桥监测点</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522143392827016100000036100000')">傅家嘴监测点</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522143383745867100000032100000')">乐华监测点</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522143383235846700000031100000')">安义东阳监测点</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522143520240662900000052100000')">庐山双塔监测点</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522147210880198600000788100000')">永修云山</span>
            <span class="layers-list-detail-item" @click="queryDetailHistory('jdz', '522147210883990700000789100000')">星子隘口</span>
          </div>
          <div class="layers-list-detail layers-list-field jdz" style="height: 248px;">
            <div class="detail-wrap-content-ss">
              <ul>
                <li class="appendhtmlvideo">
                </li>
              </ul>
            </div>
          </div>
          <img style="width: 100%; height: 299px;" src="../../static/images/jtlltj.png">
        </div>
        <div class="detail-history-wrap-tab-content lx">
          <div class="detail-wrap-lx">
            <div class="detail-wrap-content-s">
              <ul>
                <li>
                  <!--<span class="detail-wrap-item">路线代码:</span><span class="detail-wrap-item">G105</span>
                  <span class="detail-wrap-item">路线名称:</span><span class="detail-wrap-item">北京-珠海</span>-->
                  <span class="detail-wrap-item-s">路段所在行政区划:</span><span class="detail-wrap-item-s">360721</span>
                  <span class="detail-wrap-item-s">路段起点名称:</span><span class="detail-wrap-item-s">五云镇</span>
                  <span class="detail-wrap-item-s">路段止点名称:</span><span class="detail-wrap-item-s">石岩前</span>
                  <span class="detail-wrap-item-s">路段起点桩号:</span><span class="detail-wrap-item-s">2,109.770</span>
                  <span class="detail-wrap-item-s">路段止点桩号:</span><span class="detail-wrap-item-s">2,113.231</span>
                  <span class="detail-wrap-item-s">上下行方向:</span><span class="detail-wrap-item-s">上行</span>
                  <span class="detail-wrap-item-s">路段里程:</span><span class="detail-wrap-item-s">3.416</span>
                  <span class="detail-wrap-item-s">路段技术等级代码:</span><span class="detail-wrap-item-s">12</span>
                  <span class="detail-wrap-item-s">路段技术等级:</span><span class="detail-wrap-item-s">二级</span>
                  <span class="detail-wrap-item-s">是否一副高速:</span><span class="detail-wrap-item-s">否</span>
                  <span class="detail-wrap-item-s">车道数量:</span><span class="detail-wrap-item-s">2</span>
                  <span class="detail-wrap-item-s">面层类型代码:</span><span class="detail-wrap-item-s">12</span>
                  <span class="detail-wrap-item-s">面层类型:</span><span class="detail-wrap-item-s">水泥混凝土</span>
                  <span class="detail-wrap-item-s">路基宽度:</span><span class="detail-wrap-item-s">12</span>
                  <span class="detail-wrap-item-s">路面宽度:</span><span class="detail-wrap-item-s">8</span>
                  <span class="detail-wrap-item-s">设计时速:</span><span class="detail-wrap-item-s">80</span>
                  <span class="detail-wrap-item-s">修建年度:</span><span class="detail-wrap-item-s">1900</span>
                  <span class="detail-wrap-item-s">改建年度:</span><span class="detail-wrap-item-s">1999</span>
                  <span class="detail-wrap-item-s">断链类型:</span><span class="detail-wrap-item-s">0</span>
                  <span class="detail-wrap-item-s">是否城管路段:</span><span class="detail-wrap-item-s">否</span>
                  <span class="detail-wrap-item-s">是否断头路段:</span><span class="detail-wrap-item-s">否</span>
                  <span class="detail-wrap-item-s">是否收费路段:</span><span class="detail-wrap-item-s"></span>
                  <span class="detail-wrap-item-s">重复路线代码:</span><span class="detail-wrap-item-s"></span>
                  <span class="detail-wrap-item-s">重复路线起点桩号:</span><span class="detail-wrap-item-s">0</span>
                  <span class="detail-wrap-item-s">重复路线止点桩号:</span><span class="detail-wrap-item-s">0</span>
                  <span class="detail-wrap-item-s">养护里程:</span><span class="detail-wrap-item-s">3.461</span>
                  <span class="detail-wrap-item-s">可绿化里程:</span><span class="detail-wrap-item-s">3.461</span>
                  <span class="detail-wrap-item-s">已绿化里程:</span><span class="detail-wrap-item-s">3.461</span>
                  <span class="detail-wrap-item-s">地貌代码:</span><span class="detail-wrap-item-s">3</span>
                  <span class="detail-wrap-item-s">地貌:</span><span class="detail-wrap-item-s">微丘</span>
                  <span class="detail-wrap-item-s">涵洞数量:</span><span class="detail-wrap-item-s">0</span>
                  <span class="detail-wrap-item-s">管养单位名称:</span><span class="detail-wrap-item-s">赣州市公路管理局赣县公路分局</span>

                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="detail-history-wrap-tab-content gzw">
          <div style="width: 100%; height: 40px; line-height: 40px; color: #FFF; padding-left: 10px;">
            <span class="layers-title layers-ql" @click="changeLayer('ql')">桥梁</span>
            <span class="layers-title layers-sd" @click="changeLayer('sd')">隧道</span>
            <span class="layers-title layers-dk" @click="changeLayer('dk')">渡口</span>
          </div>
          <div style="width: 103%; height: calc(100% - 40px)">
            <div class="layers-list-detail-list ql" style="width: 100%; height: 40px;">
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', '{C68D769B-6B5E-41FB-ACFF-A9010A01AA7E}')">上板周中桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360105L0040')">何家平小桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360105L0010')">土塘罗家小桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360112L0010')">三分厂立交桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360121L0050')">墨山立交桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360121L0010')">莲塘桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360121L0020')">青石桥</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('ql', 'G105360121L0040')">沥口桥</span>
            </div>
            <div class="layers-list-detail-list sd">
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G105360827U0010')">洪门隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1514361124U0010')">分水关隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1514361124U0020')">车盘隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1514361124U0040')">紫溪隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1514361124U0050')">鹅湖隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1514361124U0030')">岑源隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1517360826U0010')">西峰隧道</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('sd', 'G1517360826U0020')">金桥隧道</span>
            </div>
            <div class="layers-list-detail layers-list-field ql" style="overflow: hidden">
              <div class="detail-wrap-content-ss">
                <ul>
                  <li class="appendhtmlql">
                  </li>
                </ul>
              </div>
            </div>
            <div class="layers-list-detail layers-list-field sd">
              <div class="detail-wrap-content-ss">
                <ul>
                  <li class="appendhtmlsd">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-history-wrap-tab-content yxss">
          <div style="width: 100%; height: 40px; line-height: 40px; color: #FFF; padding-left: 10px;">
            <span class="layers-title fwq layers-fwq" @click="changeLayer('fwq')">服务区</span>
            <span class="layers-title crk  layers-crk" @click="changeLayer('crk')">出入口</span>
          </div>
          <div style="width: 100%; height: calc(100% - 40px);">
            <div class="layers-list-detail-list fwq">
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G1514361124W0020')">铅山服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G1517360826W0010')">泰和服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G1517360826W0020')">白鹭湖服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G1517360881W0010')">服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G35360202W0010')">月亮湖服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G35360222W0010')">黄坛停车场</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G35360622W0010')">余江服务区</span>
              <span class="layers-list-detail-item" @click="queryDetailHistory('fwq', 'G35360730W0010')">宁都服务区</span>
            </div>
            <div class="layers-list-detail layers-list-field fwq">
              <div class="detail-wrap-content-ss">
                <ul>
                  <li class="appendhtmlfwq">
                  </li>
                </ul>
              </div>
            </div>
            <div class="layers-list-detail-list crk">
              <span class="layers-list-detail-item">艾城互通出口</span>
            </div>
            <div class="layers-list-detail layers-list-field crk">
              <div class="detail-wrap-content-ss">
                <ul>
                  <li>
                    <span class="detail-wrap-item">出入口编码:</span><span class="detail-wrap-item">G70360425P0050</span>
                    <span class="detail-wrap-item">出入口名称:</span><span class="detail-wrap-item">艾城互通出口</span>
                    <span class="detail-wrap-item">所在路线编码:</span><span class="detail-wrap-item">G70360425</span>
                    <span class="detail-wrap-item">出入口中心桩号:</span><span class="detail-wrap-item">626.9620000000</span>
                    <span class="detail-wrap-item">上下行方向编码:</span><span class="detail-wrap-item">4</span>
                    <span class="detail-wrap-item">出入口类型:</span><span class="detail-wrap-item">1</span>
                    <span class="detail-wrap-item">出入口路基类型编号:</span><span class="detail-wrap-item">S508360425</span>
                    <span class="detail-wrap-item">出入口路基类型桩号:</span><span class="detail-wrap-item">10.0000000000</span>
                    <span class="detail-wrap-item">位置:</span><span class="detail-wrap-item">1</span>
                    <span class="detail-wrap-item">行政区划编码:</span><span class="detail-wrap-item">360425</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-history-wrap-tab-content detail-history-wrap-video video">
          <div class="detail-history-wrap-video-left">
            <span>方圆五公里监测到沿线摄像头:</span>
            <span>墨山大桥监测点，距离阻断点1公里</span>
            <span>傅家嘴监测点，距离阻断点2公里</span>
          </div>
          <div class="detail-history-wrap-video-right">
            <video src="/static/mp4/video2.mp4" width="400" height="400" autoplay loop="loop"></video>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  // import store from '../vuex/store';
  // import {getListData, getUrl} from '../vuex/getters';
  // import {changeXys, set_spd_id} from '../vuex/actions';
  // import {circleColor} from '../filters.js';
  import echarts from 'echarts'
  export default{
    mounted () {
    },
    props: [],
    data: function () {
      return {
      }
    },
    methods: {
      queryHistory (alias) {
        if (alias === 'close') {
          $('.detail-history-wrap').css('display','none')
          return false
        }
        this.clickEvent('speed')
        $('.detail-history-wrap').css('display','block')
      },
      clickEvent (code) {
        switch (code) {
          case 'speed':
            $('.detail-history-wrap-tab-select').css('display','none')
            var params = {
              legends: ['历史平均速度'],
              xAxis: ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'],
              series: [
                {
                  name: '历史平均速度',
                  type: 'line',
                  stack: 'km/h',
                  data: [20, 14, 11, 13, 10, 17, 14, 13, 12, 17, 14, 19, 16, 18, 20, 17]
                }
              ]
            }
            this.initEchart('line1', params,  ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'], '速度(km/h)', '桩号')
            this.initEchart('line2', params, this.datetime_to_unix(), '速度(km/h)','时间')
            break
          case 'weather':
            var unix = Date.parse(new Date())
            unix = parseInt(unix)
            $('.detail-history-wrap-tab-select').css('display','block')
            var params = {
              legends: ['能见度'],
              xAxis: this.datetime_to_unix(),
              series: [
                {
                  name: '能见度',
                  type: 'line',
                  stack: 'km',
                  data: [5, 16, 15, 30, 25, 27, 18]
                }
              ]
            }
            this.initEchart('line3', params, ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'], '能见度(km)', '桩号')
            this.initEchart('line4', params, this.datetime_to_unix(), '能见度(km)','时间')
            $('.'+1).css('display', 'block')
            break
          case 'event':
            changeEvent('hy')
            break
          case 'isWeather':
            var val = $('#showWeather').val()
            let params = {}
            $('.weatherVal').css('display', 'none')
            $('.'+val).css('display', 'block')
            switch (val) {
              case '1':
                $('.skt1').css('display', 'block')
                $('.skt2').css('display', 'none')
                params = {
                  legends: ['能见度'],
                  xAxis: this.datetime_to_unix(),
                  series: [
                    {
                      name: '能见度',
                      type: 'line',
                      stack: 'km',
                      data: [5, 16, 15, 30, 25, 27, 18]
                    }
                  ]
                }
                this.initEchart('line3', params, ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'], '能见度(km)', '桩号')
                this.initEchart('line4', params, this.datetime_to_unix(), '能见度(km)', '时间')
                break
              case '2':
                $('.skt2').css('display', 'block')
                $('.skt1').css('display', 'none')
                params = {
                  legends: ['降水'],
                  xAxis: this.datetime_to_unix(),
                  series: [
                    {
                      name: '降水',
                      type: 'line',
                      stack: 'mm',
                      data: [5, 25, 15, 44, 26, 35, 40]
                    }
                  ]
                }
                this.initEchart('line3', params, ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'], '降水(mm)', '桩号')
                this.initEchart('line4', params, this.datetime_to_unix(), '降水(mm)', '时间')
                break
              case '3':
                var params3 = {
                  series: [
                    {
                      name: '风',
                      type: 'line',
                      stack: 'km/s',
                      data: [2, 2, 2, 2, 2, 2, 2]
                    }
                  ]
                }
                var params4 = {
                  series: [
                    {
                      name: '风',
                      type: 'line',
                      stack: 'km/s',
                      data: [6,6,4,4,4,2,2,4,2,2,2,2,2,2, 2, 2, 2]
                    }
                  ]
                }
                this.initEchart('line3', params3, ['K1720', 'K1725', 'K1730', 'K1735', 'K1740', 'K1745', 'K1750'], '风速(m/s)', '桩号')
                this.initEchart('line4', params4, this.datetime_to_unix(), '风速(m/s)', '时间')
                break
            }
            $('.detail-history-wrap-tab-content').css('display','none')
            $('.weather').css('display','block')
            return false
            break
          case 'jdz':
            $('.detail-history-wrap-tab-select').css('display','none')
            this.queryDetailHistory('jdz', '522143392833891600000037100000')
            break
          case 'lx':
            $('.detail-history-wrap-tab-select').css('display','none')
            break
          case 'gzw':
            changeLayer('ql')
            $('.detail-history-wrap-tab-select').css('display','none')
            break
          case 'yxss':
            changeLayer('fwq')
            $('.detail-history-wrap-tab-select').css('display','none')
            break
          case 'video':
            $('.detail-history-wrap-tab-select').css('display','none')
            break
        }
        $('.detail-history-wrap-tab-content').css('display','none')
        $('.'+ code).css('display','block')
        $('.title-'+ code).css('color','#fff')
      },
      changeLayer (alias) {
        switch (alias) {
          case 'ql':
            this.queryDetailHistory(alias, '{C68D769B-6B5E-41FB-ACFF-A9010A01AA7E}')
            break
          case 'sd':
            this.queryDetailHistory(alias, 'G105360827U0010')
            break
          case 'fwq':
            this.queryDetailHistory(alias, 'G1514361124W0020')
            break
        }
        $('.layers-title').css('border', 'none')
        $('.layers-'+alias).css('height', '24px')
        $('.layers-'+alias).css('lineHeight', '23px')
        $('.layers-'+alias).css('marginTop', '8px')
        $('.layers-'+alias).css('border', '1px #7adaff solid')
        $('.layers-list-detail-list').css('display','none')
        $('.layers-list-detail').css('display','none')
        $('.'+alias).css('display', 'block')
      },
      changeEvent (alias) {
        $('.event-list-dialog').css('display', 'none')
        $('.eventDetail').css('display', 'none')
        $('.' + alias).css('display', 'block')
      },
      datetime_to_unix (){
        let arr = []
        var timestamp = Date.parse(new Date())
        let curr = timestamp / 1000;
        var date = new Date(new Date().setHours(0, 0, 0, 0)) / 1000
        let stamp = ''
        let h = '', m = ''
        while(date < curr){
          stamp = new Date(parseInt(date) * 1000)
          h = stamp.getHours() < 10 ? '0'+ stamp.getHours() : stamp.getHours()
          m = stamp.getMinutes() < 10 ? '0'+ stamp.getMinutes() : stamp.getMinutes()
          arr.push( h+':'+ m)
          date += 3600
        }
        return arr
      },
      initEchart (id, params, xAxis, yunit, xunit) {
        var myChart = echarts.init(document.getElementById(id))
        var option = {
          legend: {
            right: '50px',
            textStyle: {
              color: '#0d73aa'
            }
          },
          color: ['#0d73aa'],
          grid: {
            left: '20px',
            right: '60px',
            bottom: '10px',
            top: '40px',
            containLabel: true
          },
          xAxis: [
            {
              name: xunit,
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#0d73aa'
                }
              },
              splitLine: {
                lineStyle: {
                  color: ['#0d73aa']
                }
              },
              type: 'category',
              boundaryGap: false,
              data: xAxis
            }
          ],
          yAxis: [
            {
              name: yunit,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#0d73aa'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: ['#0d73aa']
                }
              },
              type: 'value'
            }
          ],
          series: params.series
        }
        myChart.setOption(option)
      },
      playVideoTest (code) {
        var codex = code.getAttribute('ref')
        this.play(codex)
      },
      queryDetailHistory (layer, id) {
        if (layer == 'jdz') {
          layer = 'video'
        }
        $('.appendhtml'+layer).empty()
        $.ajax({ url: hdIp.hdIpField + '/jxgis-web-rest/pub/field?code='+layer, context: document.body, success: function(res){
            $.ajax({ url: hdIp.hdIpField + '/jxgis-web-rest/'+layer+'/info/' + id + '?id=' + id, context: document.body, success: function(datas){
                var html = '<li class="appendhtml'+layer+'">'
                let val = ''
                for (var i = 0; i < res.length; i++) {
                  if (layer == 'ql') {
                    val = datas.tab[0].data[res[i].code] == null ? '' : datas.tab[0].data[res[i].code]
                    html += '  <span class="detail-wrap-item">'+res[i].name+'</span><span class="detail-wrap-item">'+val+'</span>'
                  }else if (layer == 'sd' || layer == 'fwq' || layer == 'video'){
                    val = datas[res[i].code] == null ? '' : datas[res[i].code]
                    html += '  <span class="detail-wrap-item">'+res[i].name+'</span><span class="detail-wrap-item">'+val+'</span>'
                  }
                }
                html += '</li>'
                $('.appendhtml'+layer).append(html)

              }})
          }})
      },
      queryDetail (layer) {
        console.log(window.structureId)
        $.ajax({ url: hdIp.hdIpField + '/jxgis-web-rest/pub/field?code='+layer, context: document.body, success: function(res){
            $.ajax({ url: hdIp.hdIpField + '/jxgis-web-rest/'+layer+'/info/' + window.structureId + '?id=' + window.structureId, context: document.body, success: function(datas){
                if(datas != null && datas.tab.length > 0){
                  var html = '<div class="detail-wrap">'
                  html += '<div class="detail-wrap-title">'
                  html += '<span class="iconfont icon-xiangqing"></span><span>桥梁</span>'
                  html += '<span @click="closeDetail()">X</span>'
                  html += '</div>'
                  html += '<div class="detail-wrap-subtitle">'
                  html += '桥梁基本信息'
                  html += '</div>'
                  html += '<div class="detail-wrap-content-ss">'
                  html += '<ul>'
                  for (var i = 0; i < res.length - 1; i++) {
                    html += '<li>'
                    html += ' <span class="detail-wrap-item">'+ res[i].name+':</span>'
                    html += '<span class="detail-wrap-item">' + datas.tab[0].data[res[i].code] +'</span>'
                    html += ' <span class="detail-wrap-item">'+ res[i+1].name+':</span>'
                    html += '<span class="detail-wrap-item">' + datas.tab[0].data[res[i+1].code] +'</span>'
                    html += '</li>'
                  }
                  html += '</ul>'
                  html += '</div>'
                  html += '</div>'
                  $('.detail-wrap').append(html)
                  $('.detail-wrap').css('display','block')
                }
              }})
          }})
      },
      closeDetail () {
        $('.detail-wrap').css('display','none')
      }
    }
  }
</script>
<style lang="scss"anim-marker>
</style>
