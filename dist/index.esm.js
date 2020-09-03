import React, { useRef, useState, useEffect, forwardRef, useMemo, useImperativeHandle } from 'react';
import Barcode from 'react-barcode';
import { message, Space, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ReactDOM from 'react-dom';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".index_body__3JAOh {\n  overflow: hidden;\n}\n.index_hide__3iZps {\n  position: fixed;\n  left: -99900px;\n  top: 0;\n}\n@media print {\n  .index_hide__3iZps {\n    position: static;\n  }\n}\n.index_printWindows__3Ed8x {\n  overflow: visible;\n}\n";
var styles = {"body":"index_body__3JAOh","hide":"index_hide__3iZps","printWindows":"index_printWindows__3Ed8x"};
styleInject(css);

var css$1 = ".default_cover__35pLu {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n}\n.default_A4__2EGX9 {\n  background-color: #ffffff;\n  height: 288.54mm;\n  width: 201.54mm;\n  overflow: hidden;\n  margin-bottom: 10px;\n  display: flex;\n  flex-direction: column;\n}\n.default_row__2v7At {\n  background: red;\n}\n@media print {\n  .default_A4__2EGX9 {\n    page-break-after: always;\n    margin-bottom: 0;\n  }\n}\n/*纸张设置为宽1200px 高800px*/\n@page {\n  size: A4;\n  margin: 4.23mm;\n}\n";
var styles$1 = {"cover":"default_cover__35pLu","A4":"default_A4__2EGX9","row":"default_row__2v7At"};
styleInject(css$1);

var css$2 = ".cover_header__HuYVq {\n  height: 9.6pt;\n  background: linear-gradient(-90deg, #8ed9e7, #37c0bc, #f6845b);\n  width: 100%;\n}\n.cover_cover_title__3Pp-E {\n  margin-top: 40pt;\n}\n.cover_cover_title__3Pp-E .cover_cover_title_text__YIX5O {\n  font-size: 34pt;\n  font-family: Source Han Sans SC;\n  font-weight: 400;\n  color: #37c0bc;\n}\n.cover_cover_tips__2xR-M {\n  display: flex;\n  flex-direction: column;\n  margin-top: 48pt;\n  text-align: center;\n}\n.cover_cover_tips__2xR-M .cover_cover_tips_en__2WMKX {\n  font-size: 19pt;\n  font-family: Lato;\n  font-weight: 400;\n  color: #37c0bc;\n}\n.cover_cover_tips__2xR-M .cover_cover_tips_cn__1CQVD {\n  font-size: 48pt;\n  font-family: Source Han Sans SC;\n  font-weight: bold;\n  color: #37c0bc;\n}\n.cover_cover_box__1fare {\n  background: #ffffff;\n  border: 1pt solid #37c0bc;\n  padding: 25pt 37pt;\n  border-radius: 10pt;\n  margin-top: 63pt;\n}\n.cover_cover_box__1fare .cover_cover_box_title__3F1O4 {\n  font-size: 14pt;\n  font-weight: bold;\n  color: #2a3030;\n  width: 61pt;\n  display: inline-block;\n  text-align: justify;\n  -moz-text-align-last: justify;\n       text-align-last: justify;\n}\n.cover_cover_box__1fare .cover_cover_box_colon__34lI- {\n  color: #2a3030;\n  font-size: 14pt;\n  font-weight: bold;\n}\n.cover_cover_box__1fare .cover_cover_box_text__2-v6z {\n  font-size: 13pt;\n  color: #2a3030;\n  margin-left: 13pt;\n  display: inline-block;\n}\n.cover_cover_img__1FM7f {\n  width: 100%;\n  height: 248pt;\n  position: relative;\n  margin-top: auto;\n}\n.cover_cover_img__1FM7f .cover_cover_img_bg__3ewkd {\n  width: 100%;\n  height: 100%;\n}\n.cover_cover_img__1FM7f .cover_cover_img_tips__3FzkJ {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n}\n.cover_cover_img__1FM7f .cover_cover_img_tips__3FzkJ .cover_cover_img_tips_text__CmVQu {\n  font-size: 8pt;\n  color: #ffffff;\n  margin-left: 177pt;\n  margin-bottom: 5pt;\n  display: inline-block;\n}\n";
var styles$2 = {"header":"cover_header__HuYVq","cover_title":"cover_cover_title__3Pp-E","cover_title_text":"cover_cover_title_text__YIX5O","cover_tips":"cover_cover_tips__2xR-M","cover_tips_en":"cover_cover_tips_en__2WMKX","cover_tips_cn":"cover_cover_tips_cn__1CQVD","cover_box":"cover_cover_box__1fare","cover_box_title":"cover_cover_box_title__3F1O4","cover_box_colon":"cover_cover_box_colon__34lI-","cover_box_text":"cover_cover_box_text__2-v6z","cover_img":"cover_cover_img__1FM7f","cover_img_bg":"cover_cover_img_bg__3ewkd","cover_img_tips":"cover_cover_img_tips__3FzkJ","cover_img_tips_text":"cover_cover_img_tips_text__CmVQu"};
styleInject(css$2);

/**
 * 封面
 */

var Cover = (function (_ref) {
  var _Data$info$data, _Data$info$data$title;

  var Data = _ref.Data;
  var info = Data.info.cover.map(function (e) {
    return React.createElement("div", {
      key: e
    }, React.createElement("span", {
      className: styles$2.cover_box_title
    }, Data.info.data[e].title), React.createElement("span", {
      className: styles$2.cover_box_colon
    }, ":"), React.createElement("span", {
      className: styles$2.cover_box_text
    }, Data.info.data[e].data));
  });
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: styles$2.header
  }), React.createElement("div", {
    className: styles$2.cover_title
  }, React.createElement("span", {
    className: styles$2.cover_title_text
  }, (_Data$info$data = Data.info.data) === null || _Data$info$data === void 0 ? void 0 : (_Data$info$data$title = _Data$info$data.title) === null || _Data$info$data$title === void 0 ? void 0 : _Data$info$data$title.data)), React.createElement("div", {
    className: styles$2.cover_tips
  }, React.createElement("span", {
    className: styles$2.cover_tips_en
  }, "Health Examination Report"), React.createElement("span", {
    className: styles$2.cover_tips_cn
  }, "\u5065\u5EB7\u4F53\u68C0\u62A5\u544A")), React.createElement("div", {
    className: styles$2.cover_box
  }, info), React.createElement("div", {
    className: styles$2.cover_img
  }, React.createElement("img", {
    src: "http://xm.gwtj.net:8888/upload/temp/tjbg_fm2.png",
    className: styles$2.cover_img_bg,
    crossOrigin: "anonymous",
    onLoad: function onLoad() {
      return console.log("图片加载完毕");
    }
  }), React.createElement("div", {
    className: styles$2.cover_img_tips
  }, React.createElement("span", {
    className: styles$2.cover_img_tips_text
  }, "*\u672C\u62A5\u544A\u4EC5\u7528\u4E8E\u5065\u5EB7\u68C0\u67E5\uFF0C\u4E0D\u505A\u4EFB\u4F55\u5176\u4ED6\u7528\u9014"))));
});

var css$3 = ".page_page_header__2bkP1 {\n  display: flex;\n  height: 67pt;\n  align-items: stretch;\n  padding: 0 10pt;\n  padding-bottom: 16pt;\n  overflow: hidden;\n}\n.page_page_header__2bkP1 .page_page_header_orCode__pa1wR {\n  display: flex;\n  align-items: flex-end;\n}\n.page_page_header__2bkP1 .page_page_header_info__2j0Qn {\n  flex: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-left: 10pt;\n}\n.page_page_header__2bkP1 .page_page_header_info__2j0Qn .page_page_header_info_item__2EkGc {\n  font-size: 10pt;\n  font-weight: bold;\n  color: #292f2f;\n  white-space: nowrap;\n}\n.page_detailsInfo__3n2r3 {\n  display: flex;\n  align-items: stretch;\n  padding: 0 29pt;\n  margin-top: 20pt;\n}\n.page_detailsInfo__3n2r3 .page_detailsInfo_left__1JbTS {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -30pt;\n  align-content: flex-start;\n}\n.page_detailsInfo__3n2r3 .page_detailsInfo_left__1JbTS .page_detailsInfo_left_item__3xCP9 {\n  margin-right: 17pt;\n  margin-bottom: 10pt;\n  font-size: 10pt;\n  font-weight: 400;\n  color: #292f2f;\n  min-width: 147pt;\n}\n.page_detailsInfo__3n2r3 .page_detailsInfo_left__1JbTS .page_detailsInfo_left_item_title__WZdxI {\n  width: 40pt;\n  text-align: justify;\n  -moz-text-align-last: justify;\n       text-align-last: justify;\n  display: inline-block;\n}\n.page_detailsInfo__3n2r3 .page_detailsInfo_right__HmemK .page_detailsInfo_right_img__1XCZI {\n  width: 71pt;\n  height: 95pt;\n}\n.page_foot_br__W7Myc {\n  height: 1pt;\n  background: linear-gradient(-90deg, #8ed9e7, #37c0bc, #f6845b);\n  width: 100%;\n}\n.page_br__27Wlc {\n  width: 100%;\n  height: 5pt;\n  background: linear-gradient(-90deg, #8ed9e7, #37c0bc, #f6845b);\n}\n.page_page_content__31po4 {\n  padding: 0pt 29pt;\n  position: relative;\n  flex: 1;\n  overflow: hidden;\n  box-sizing: border-box;\n  margin: 5pt 0;\n}\n.page_page_content__31po4 .page_page_content_item__mlQAg {\n  margin-top: 9pt;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 4pt;\n}\n.page_page_content__31po4 .page_page_content_item_title__2zWpG {\n  font-size: 11pt;\n  color: #37bfbb;\n  margin-bottom: 4pt;\n  font-weight: bold;\n}\n.page_page_content__31po4 .page_page_content_item_author__2pNL6 {\n  font-size: 9pt;\n  color: #292f2f;\n  align-self: flex-end;\n  margin-top: 4pt;\n}\n.page_page_content__31po4 .page_page_content_imgBox__3w8Bk {\n  width: 100%;\n  height: 100%;\n}\n.page_page_content__31po4 .page_page_content_img__3XFJa {\n  width: 100%;\n  height: 100%;\n}\n.page_page_foot__ROgUH {\n  display: flex;\n  align-items: center;\n  height: 28pt;\n  justify-content: space-between;\n  padding: 0 20pt;\n}\n.page_page_foot__ROgUH > span {\n  flex: 1;\n  font-size: 8pt;\n  font-weight: 400;\n  color: #292f2f;\n}\n.page_page_foot__ROgUH .page_page_foot_text_center__16Cxp {\n  text-align: center;\n}\n.page_page_foot__ROgUH .page_page_foot_text_right__227fP {\n  text-align: right;\n}\n";
var styles$3 = {"page_header":"page_page_header__2bkP1","page_header_orCode":"page_page_header_orCode__pa1wR","page_header_info":"page_page_header_info__2j0Qn","page_header_info_item":"page_page_header_info_item__2EkGc","detailsInfo":"page_detailsInfo__3n2r3","detailsInfo_left":"page_detailsInfo_left__1JbTS","detailsInfo_left_item":"page_detailsInfo_left_item__3xCP9","detailsInfo_left_item_title":"page_detailsInfo_left_item_title__WZdxI","detailsInfo_right":"page_detailsInfo_right__HmemK","detailsInfo_right_img":"page_detailsInfo_right_img__1XCZI","foot_br":"page_foot_br__W7Myc","br":"page_br__27Wlc","page_content":"page_page_content__31po4","page_content_item":"page_page_content_item__mlQAg","page_content_item_title":"page_page_content_item_title__2zWpG","page_content_item_author":"page_page_content_item_author__2pNL6","page_content_imgBox":"page_page_content_imgBox__3w8Bk","page_content_img":"page_page_content_img__3XFJa","page_foot":"page_page_foot__ROgUH","page_foot_text_center":"page_page_foot_text_center__16Cxp","page_foot_text_right":"page_page_foot_text_right__227fP"};
styleInject(css$3);

var css$4 = ".table_table__pYNhJ {\n  width: 100%;\n}\n.table_table__pYNhJ .table_columns__3id_3 {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n}\n.table_table__pYNhJ .table_columns__3id_3 .table_columns_item__ngJx- {\n  flex: 1;\n  background: #37bfbb;\n  color: #fff;\n  text-align: center;\n  padding: 2pt;\n  border-right: 1pt solid #fff;\n  font-size: 9pt;\n  word-wrap: break-word;\n  word-break: break-all;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.table_table__pYNhJ .table_body__2IZhn {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  width: 100%;\n}\n.table_table__pYNhJ .table_body__2IZhn .table_body_row__1i0kG {\n  display: flex;\n  flex: 1;\n  text-align: center;\n  width: 100%;\n  position: relative;\n}\n.table_table__pYNhJ .table_body__2IZhn .table_body_row_star__2dr99 {\n  position: absolute;\n  right: -9pt;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 22pt;\n  font-weight: 400;\n  color: #f5541b;\n  height: 100%;\n}\n.table_table__pYNhJ .table_body__2IZhn .table_body_row__1i0kG .table_body_row_item__2q5BI {\n  flex: 1;\n  padding: 5pt;\n  color: #191919;\n  font-size: 9pt;\n  font-family: SourceHanSansSC-Regular;\n  word-wrap: break-word;\n  word-break: break-all;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: left;\n}\n.table_table__pYNhJ .table_body__2IZhn .table_body_row__1i0kG .table_body_row_item_title__3Pnmp {\n  background-color: #e5f5f5;\n  border-bottom: 1pt solid #eee;\n}\n.table_table__pYNhJ .table_body__2IZhn .table_body_row__1i0kG .table_body_row_item_line__VIQ0J {\n  border-bottom: 1pt solid #eee;\n}\n";
var tableStyles = {"table":"table_table__pYNhJ","-moz-columns":"table_columns__3id_3","columns":"table_columns__3id_3","columns_item":"table_columns_item__ngJx-","body":"table_body__2IZhn","body_row":"table_body_row__1i0kG","body_row_star":"table_body_row_star__2dr99","body_row_item":"table_body_row_item__2q5BI","body_row_item_title":"table_body_row_item_title__3Pnmp","body_row_item_line":"table_body_row_item_line__VIQ0J"};
styleInject(css$4);

var ComponentType;

(function (ComponentType) {
  ComponentType["Table"] = "table";
  ComponentType["Img"] = "img";
  ComponentType["Report"] = "report";
})(ComponentType || (ComponentType = {}));

/**
 * table
 */

var Table = (function (_ref) {
  var columns = _ref.columns,
      dataSource = _ref.dataSource;
  var title = columns.map(function (e, i, arr) {
    return React.createElement("div", {
      key: e.dataIndex,
      className: tableStyles.columns_item
    }, React.createElement("span", null, e.title));
  });
  var rowItem = dataSource.map(function (e, i) {
    return React.createElement("div", {
      key: i,
      className: tableStyles.body_row
    }, columns.map(function (res, i) {
      return React.createElement("div", {
        key: res.dataIndex,
        className: "".concat(tableStyles.body_row_item, " ").concat(i === 0 ? tableStyles.body_row_item_title : tableStyles.body_row_item_line)
      }, React.createElement("span", null, e[res.dataIndex]));
    }), e.isUnusual && React.createElement("div", {
      className: tableStyles.body_row_star
    }, "*"));
  });
  return React.createElement("div", {
    className: tableStyles.table
  }, React.createElement("div", {
    className: tableStyles.columns
  }, title), React.createElement("div", {
    className: tableStyles.body
  }, rowItem));
});

/**
 * 裁剪表格
 * @param arr 源数组
 * @param htmlList 已渲染DOM列表
 * @param MaxHeight 最大高度
 */

function cropTable(arr, htmlList, MaxHeight) {
  var item = arr[arr.length - 1];
  var index = htmlList.findIndex(function (e) {
    //得到裁剪位置
    var offsetTop = e.offsetTop;
    var height = e.clientHeight;

    if (offsetTop + height > MaxHeight) {
      return true;
    }
  }); // 第一项超出，则全部放到下一页展示

  if (index === 0) {
    var i = item.pop();
    arr.push([i]);
    return arr;
  }

  console.log('裁剪位置:', index);
  var table = item[item.length - 1].data; //旧Table

  var obj = JSON.parse(JSON.stringify(item[item.length - 1])); //拷贝到新对象

  var newTable = obj.data;
  newTable.data = table.data.splice(index);
  newTable.title = null; //去掉title

  table.author = null;
  arr.push([obj]);
  return arr;
}

function usePageList(Data, getHeight, getHtmlList, readyPromise) {
  var El = useRef({
    index: 0
  });

  var _useState = useState(Data.page.length === 0 ? [] : [[Data.page[El.current.index]]]),
      _useState2 = _slicedToArray(_useState, 2),
      pageList = _useState2[0],
      setPageList = _useState2[1]; //页面数组


  useEffect(function () {
    if (pageList.length === 0) {
      readyPromise.res('绘制完毕');
      return;
    }

    var arr = JSON.parse(JSON.stringify(pageList));
    var height = getHeight(); //获取高度

    var lastArr = arr[arr.length - 1];
    var lastItem = lastArr[lastArr.length - 1]; // 判断是否超出边界

    if (lastItem.type === ComponentType.Table) {
      var _itemDom$content, _itemDom$content2;

      //表格
      var itemDom = getHtmlList(lastArr.length - 1);
      var itemDomPos = ((_itemDom$content = itemDom.content) === null || _itemDom$content === void 0 ? void 0 : _itemDom$content.clientHeight) + (itemDom === null || itemDom === void 0 ? void 0 : (_itemDom$content2 = itemDom.content) === null || _itemDom$content2 === void 0 ? void 0 : _itemDom$content2.offsetTop);

      if (height && itemDomPos > height && itemDom.list) {
        //超出边界
        setPageList(cropTable(arr, itemDom.list, height)); //裁剪表格

        return;
      }
    } // 坐标已到达极限


    if (El.current.index >= Data.page.length - 1) {
      readyPromise.res('绘制完毕');
      return;
    } // 移动坐标，继续绘制


    ++El.current.index;
    var item = Data.page[El.current.index]; //取出要渲染的项

    if (item.isNewPage || lastItem.isNewPage) {
      arr.push([item]); //创建新页
    } else {
      arr[arr.length - 1].push(item); //在本页尾部追加
    }

    setPageList(arr);
  }, [pageList]);
  return [pageList];
}

var css$5 = ".report_title__3sOyW {\n  font-size: 20pt;\n  font-weight: bold;\n  text-align: center;\n  margin-bottom: 10pt;\n}\n.report_info__3Qwq2 {\n  border-top: 3pt solid #000;\n  border-bottom: 3pt solid #000;\n  padding: 7pt 2pt;\n  display: flex;\n  flex-wrap: wrap;\n}\n.report_info__3Qwq2 .report_info_item__-9kKl {\n  font-size: 9pt;\n  font-weight: bold;\n  line-height: 16pt;\n  min-width: 177pt;\n}\n.report_info__3Qwq2 .report_info_item_title__KryA7 {\n  width: 48pt;\n  text-align: justify;\n  -moz-text-align-last: justify;\n       text-align-last: justify;\n  display: inline-block;\n}\n.report_imgList__2ErRb {\n  margin: 10pt 0;\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n}\n.report_imgList__2ErRb .report_imgList_item__2-lxH {\n  flex: 1;\n  margin-right: 10pt;\n}\n.report_imgList__2ErRb .report_imgList_item__2-lxH .report_imgList_item_img__3kp5K {\n  width: 100%;\n  height: 200pt;\n}\n.report_description__bPQgD {\n  border-top: 3pt solid #000;\n  height: 250pt;\n  padding: 5pt;\n  font-size: 10pt;\n  font-weight: bold;\n  overflow: hidden;\n}\n.report_say__3KVtu {\n  border-top: 3pt solid #000;\n  height: 100pt;\n  padding: 5pt;\n  font-size: 10pt;\n  font-weight: bold;\n  overflow: hidden;\n}\n.report_foot__jdXym {\n  border-top: 3pt solid #000;\n  overflow: hidden;\n  padding-top: 3pt;\n}\n.report_foot__jdXym .report_foot_row__1U5F- {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 10pt;\n}\n.report_foot__jdXym .report_foot_row__1U5F- .report_foot_row_item__m8bNJ {\n  font-size: 10pt;\n  font-weight: bold;\n  margin-right: 5pt;\n  min-width: 135pt;\n}\n.report_pre__34T-1 {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n.report_reportInfo__2Jd-M {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 5pt;\n}\n.report_reportInfo__2Jd-M .report_reportInfo_item__3typk {\n  font-size: 8pt;\n  font-weight: bold;\n}\n.report_reportInfo__2Jd-M .report_reportInfo_item__3typk > span {\n  display: inline-block;\n  min-width: 46pt;\n}\n";
var styles$4 = {"title":"report_title__3sOyW","info":"report_info__3Qwq2","info_item":"report_info_item__-9kKl","info_item_title":"report_info_item_title__KryA7","imgList":"report_imgList__2ErRb","imgList_item":"report_imgList_item__2-lxH","imgList_item_img":"report_imgList_item_img__3kp5K","description":"report_description__bPQgD","say":"report_say__3KVtu","foot":"report_foot__jdXym","foot_row":"report_foot_row__1U5F-","foot_row_item":"report_foot_row_item__m8bNJ","pre":"report_pre__34T-1","reportInfo":"report_reportInfo__2Jd-M","reportInfo_item":"report_reportInfo_item__3typk"};
styleInject(css$5);

/**
 * 报告单
 */

var Report = (function (_ref) {
  var data = _ref.data,
      info = _ref.info;
  var infoList = data.basicInfo.map(function (e, i) {
    return React.createElement("div", {
      className: styles$4.info_item,
      key: e
    }, React.createElement("span", {
      className: styles$4.info_item_title
    }, info.data[e].title), React.createElement("span", null, "\uFF1A"), React.createElement("span", null, info.data[e].data));
  });
  var reportInfo = data.reportInfo.map(function (e, i) {
    return React.createElement("div", {
      className: styles$4.reportInfo_item,
      key: i
    }, React.createElement("span", null, e.title, "\uFF1A"), React.createElement("span", null, e.value));
  }); // 图片列表

  var imgList = data.img.map(function (e, i) {
    return React.createElement("div", {
      className: styles$4.imgList_item,
      key: i
    }, React.createElement("img", {
      src: e,
      className: styles$4.imgList_item_img
    }));
  }); // 底部

  var foot = data.foot.map(function (e, i) {
    return React.createElement("div", {
      className: styles$4.foot_row,
      key: i
    }, e.map(function (res, i) {
      return React.createElement("div", {
        className: styles$4.foot_row_item,
        key: i
      }, React.createElement("span", null, res.title, "\uFF1A"), React.createElement("span", null, res.value));
    }));
  });
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: styles$4.title
  }, data.title), React.createElement("div", {
    className: styles$4.reportInfo
  }, reportInfo), React.createElement("div", {
    className: styles$4.info
  }, infoList), React.createElement("div", {
    className: styles$4.imgList
  }, imgList), React.createElement("div", {
    className: styles$4.description
  }, React.createElement("pre", {
    className: styles$4.pre
  }, data.description)), React.createElement("div", {
    className: styles$4.say
  }, React.createElement("pre", {
    className: styles$4.pre
  }, data.say)), React.createElement("div", {
    className: styles$4.foot
  }, foot));
});

/**
 * 默认的渲染模版
 */

var Page = (function (_ref) {
  var Data = _ref.Data,
      readyPromise = _ref.readyPromise;
  var divEl = useRef(null);

  var getHeight = function getHeight() {
    var _divEl$current;

    return (_divEl$current = divEl.current) === null || _divEl$current === void 0 ? void 0 : _divEl$current.clientHeight;
  };

  var getHtmlList = function getHtmlList(index) {
    var _divEl$current2;

    //获取已选染TableDOM
    var itemDom = (_divEl$current2 = divEl.current) === null || _divEl$current2 === void 0 ? void 0 : _divEl$current2.children[index];
    var list = itemDom === null || itemDom === void 0 ? void 0 : itemDom.getElementsByClassName(tableStyles.table)[0].children[1].children;
    return {
      content: itemDom,
      list: list ? _toConsumableArray(list) : []
    };
  };

  var _usePageList = usePageList(Data, getHeight, getHtmlList, readyPromise),
      _usePageList2 = _slicedToArray(_usePageList, 1),
      pageList = _usePageList2[0]; // 页眉


  var header = function header() {
    var info = Data.info.headerInfo;
    return React.createElement("div", {
      className: styles$3.page_header
    }, React.createElement("div", {
      className: styles$3.page_header_orCode
    }, React.createElement(Barcode, {
      value: Data.info.data[info.barCode].data,
      height: 50,
      width: 1.3,
      displayValue: false,
      margin: 0
    })), React.createElement("div", {
      className: styles$3.page_header_info
    }, info.info.map(function (e) {
      return React.createElement("div", {
        className: styles$3.page_header_info_item,
        key: e
      }, React.createElement("span", null, Data.info.data[e].title, "\uFF1A"), React.createElement("span", null, Data.info.data[e].data));
    })));
  }; // 尾部


  var foot = function foot(index, length) {
    return React.createElement("div", {
      className: styles$3.page_foot
    }, React.createElement("span", null, "*\u672C\u62A5\u544A\u4EC5\u7528\u4E8E\u5065\u5EB7\u68C0\u67E5\uFF0C\u4E0D\u505A\u4EFB\u4F55\u5176\u4ED6\u7528\u9014"), React.createElement("span", {
      className: styles$3.page_foot_text_center
    }, "\u7B2C ", index, " / ", length, "\u9875"), React.createElement("span", {
      className: styles$3.page_foot_text_right
    }, "\u516C\u536B\u4F53\u68C0"));
  }; // 表格


  var table = function table(_table, i) {
    return React.createElement("div", {
      className: styles$3.page_content_item,
      key: i
    }, _table.title && React.createElement("div", {
      className: styles$3.page_content_item_title
    }, _table.title), React.createElement(Table, {
      columns: _table.columns,
      dataSource: _table.data
    }), _table.author && React.createElement("div", {
      className: styles$3.page_content_item_author
    }, "\u68C0\u67E5\u533B\u5E08\xA0\xA0\xA0\xA0\xA0\xA0", _table.author));
  }; // 项目


  var pageItem = function pageItem(e) {
    return e.map(function (res, i) {
      if (res.type === ComponentType.Table) {
        //表格
        var data = res.data;
        return table(data, i);
      }

      if (res.type === ComponentType.Img) {
        //图片
        var _data = res.data;
        return React.createElement("img", {
          src: _data.src,
          className: styles$3.page_content_img,
          key: i
        });
      }

      if (res.type === ComponentType.Report) {
        //报告单
        var _data2 = res.data;
        return React.createElement(Report, {
          data: _data2,
          info: Data.info,
          key: i
        });
      }

      return null;
    });
  }; // 详细信息


  var detailsInfo = function detailsInfo() {
    var detailsInfo = Data.info.detailsInfo;
    var arr = [];
    var avatar = null; //头像

    detailsInfo.forEach(function (e) {
      if (e === 'avatar') {
        return avatar = React.createElement("img", {
          src: Data.info.data[e].data,
          className: styles$3.detailsInfo_right_img
        });
      }

      arr.push(React.createElement("div", {
        className: styles$3.detailsInfo_left_item,
        key: e
      }, React.createElement("span", {
        className: styles$3.detailsInfo_left_item_title
      }, Data.info.data[e].title), React.createElement("span", null, "\uFF1A"), React.createElement("span", null, Data.info.data[e].data)));
    });
    return React.createElement("div", {
      className: styles$3.detailsInfo
    }, React.createElement("div", {
      className: styles$3.detailsInfo_left
    }, arr), React.createElement("div", {
      className: styles$3.detailsInfo_right
    }, avatar));
  }; // 页内容


  var page = pageList.map(function (e, index, arr) {
    return React.createElement("div", {
      className: "".concat(styles$1.A4),
      key: index
    }, header(), React.createElement("div", {
      className: styles$3.br
    }), index === 0 && detailsInfo(), React.createElement("div", {
      className: styles$3.page_content,
      ref: divEl
    }, pageItem(e)), React.createElement("div", {
      className: styles$3.foot_br
    }), foot(index + 1, arr.length));
  });
  return React.createElement(React.Fragment, null, page);
});

var css$6 = ".foot_br__3ZJIH {\n  width: 100%;\n  height: 5pt;\n  background: linear-gradient(-90deg, #8ed9e7, #37c0bc, #f6845b);\n}\n.foot_body__2S55o {\n  background: #e5f5f5;\n  border: 4px solid #ffffff;\n  border-radius: 0pt 71pt 0pt 71pt;\n  height: 671pt;\n  width: 503pt;\n  margin: 0 auto;\n  margin-top: 75pt;\n  position: relative;\n}\n.foot_body__2S55o .foot_body_bg_1__2SlB1 {\n  height: 43pt;\n  width: 59pt;\n  position: absolute;\n  top: 36pt;\n  left: 19pt;\n}\n.foot_body__2S55o .foot_body_bg_2__3RR0k {\n  height: 175pt;\n  width: 220pt;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n}\n.foot_body__2S55o .foot_body_text__1IfKY {\n  margin: 0 auto;\n  margin-top: 53pt;\n  width: 427pt;\n  height: 505pt;\n  position: relative;\n  z-index: 1;\n}\n.foot_body__2S55o .foot_body_text__1IfKY .foot_body_text_title__kkWy_ {\n  font-weight: bold;\n  font-size: 19pt;\n  color: #292f2f;\n}\n.foot_body__2S55o .foot_body_text__1IfKY .foot_body_text_content__3afXX {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  color: #292f2f;\n  font-size: 16pt;\n  margin-top: 58pt;\n}\n.foot_body__2S55o .foot_body_info__6Z9S2 {\n  margin-left: 78pt;\n  border-left: 1pt solid #37bfbb;\n  padding-left: 14pt;\n  position: relative;\n  z-index: 1;\n}\n.foot_body__2S55o .foot_body_info__6Z9S2 .foot_body_info_item__PeKAj {\n  font-size: 12pt;\n  color: #292f2f;\n  line-height: 21pt;\n}\n.foot_body__2S55o .foot_body_info__6Z9S2 .foot_body_info_item__PeKAj .foot_body_info_item_title__12ubu {\n  width: 55pt;\n  display: inline-block;\n  text-align: justify;\n  -moz-text-align-last: justify;\n       text-align-last: justify;\n}\n.foot_body__2S55o .foot_body_info__6Z9S2 .foot_body_info_item__PeKAj .foot_body_info_item_value__2yZS8 {\n  margin-left: 15pt;\n}\n";
var styles$5 = {"br":"foot_br__3ZJIH","body":"foot_body__2S55o","body_bg_1":"foot_body_bg_1__2SlB1","body_bg_2":"foot_body_bg_2__3RR0k","body_text":"foot_body_text__1IfKY","body_text_title":"foot_body_text_title__kkWy_","body_text_content":"foot_body_text_content__3afXX","body_info":"foot_body_info__6Z9S2","body_info_item":"foot_body_info_item__PeKAj","body_info_item_title":"foot_body_info_item_title__12ubu","body_info_item_value":"foot_body_info_item_value__2yZS8"};
styleInject(css$6);

var foot_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAe4AAAFoCAYAAACR/hiTAAA1o0lEQVR42u3de3xbZ53n8e/vOZItybIkJ3butzZpS6+UQlugJXbYGZhlt8ssM+0MHWgLLGWAgdmyQC9JwSzQlt5ggc5su0vbaZvCpsPOpTvAzjLjI6VMO21hpm3aJr3lbieObUm2Lral8/z2D8mObCdO2kSybH/fr1fAlo4ufnT59Dk65wggIiKiWUPq8U59+bkDTQ2NhbVa8NaJwSlWsFwViwFtU5EWVbQoYACNqQIKhBRoVAAQ9VQxqAAskIQiB2gawEEr2m0telVMt0APKnBAG4q77jvjjD4+FYiIiOE+FlXZ9PK+dSK4UFTfZYELAD1DgSUKAKUol/8pgMrfS7+pHuG0ycvp1NMqr88q+qG6HcB2C90hkO3wycsrz1r7RqeI5dOEiIjmbbg7X9pzjsD8top+QFXfAyB6tPDWKtyl6xg7ZcIyQwo8DcVTFvLPPg9PPXDBaYf4tCEiojkb7u+/+mpjuhj8bQAfUegHVLEcx4px/YR7/Hwc/v0NhT4FNVuLDuL/69zTX+bTiIiIZn24b3l533sscA2AP1BodDyKWhnHWRnuidehclChrgVctV7isQvOfolPKyIimhXh7ty5M9A47LvKQj4P4LzDIayI4pwL95TlDwLiQhCH58UZciIiqrtwf31bbzjojPyJhVwHYFFlAOdhuCuutxRyq3ABxBUa/xuGnIiIZircW1Sd13d0Xy0q31LYpVODzXDr1HEohVw0YVRchpyIiGoS7jte2f9bnof/BsFZOEL4GO6jhnvyfTpoIa6IJqyK+3OGnIiITma4b3v99agUAt9FacMzORxYhvsthnvy/T6oijjUxsX4GHIiInrr4b7j5X3vUZFHFViDyjgz3Ccv3DrpdymFXFTjnvHcf7jgAoaciIjhPrY7d/R8zqp+D1C/VpzOcFc53JP+TpQO1ZoA1IVRhpyIiOGeqFPVNO3ouQvAf66MHcM9Y+GefBsHVZEQwDVW3X94N0NORDRvw71F1dm9o+dBAB/DpNgx3HUT7oqxVqiiF9A4oK61xt3KkBMRzY9wq6rc9UrPA1BcXRkehrvOwz318ehVaByAK9a4Wy9+x8sQUT71iYjmWLjvfLn7VghumBxghnvWhfvwTwoobK8CcQhcx1p368UXM+RERLM93Hdu7/4jAI/gCAFmuGd7uI+wal0RF4FbMIg/c+GFLzHkRESzKNzf277/DA/yGwVCDPe8CPfkpXpVbRwirjWGISciqudwb1F19r7S/QRU3j0lzgz3fAn3+H0r/9ILIA7VuLXWfeaSSxhyIqJ6Cfdd23s+C9E/gx4hzgz3fA33xAcO6AVsHDAMORHRTIb7O9sPNfuk+AagrQw3wz1NuA8/MGMzckVcgYQCXQw5EVGNwn3XjgM3AnoLKmLEcDPcxxHuipN1fEaukITCMORERNUI99e3bWuI+hfuVmAJw81wn2C4Ky5TnpFDEyoaV2jXM5dsYMiJiE403N/d3vP7KnhMK96UGW6G+ySFe/JlSiEH4moYciKitxTuu7f3/CUEv8dwM9w1CPfk6+wFsFVFXS1K1zMbGHIiomnD3blzZyAyEuiHIMRwM9wzEO5J52svBFvViqvKkBMRTQn3917pXm9V4pVv5gw3wz2D4a5YHaSA4hBQ/vYz9bp+teGDDDkRze9w37W953oR3MZwM9x1Gu7x88u7QBxS1YSj6kLAkBPR/Av33du7N0PkSoab4Z4l4Qa04mdonwBxKBhyIponM+4dPU8LcCHDzXDP0nCXftbxn/tUNW4ErlO0rvuBf/ciQ05Ec2vGvaNnL4AVDDfDPUfCPeGyAvQBGlcRhpyI5ky4UwCiDDfDPUfDPX6dpVxrn0DjAFwLE0/81oe2MeRENNvCPentlOFmuOd0uMdPk9JpfaIaV6OugcZ/+VsfZsiJiOFmuBnuOg73xMtZ7YNoHNA4jLgMOREx3Aw3w13P4S7fJ6mYkZc+I0fcVxT3Zx9iyImI4Wa4Ge66DXfpOipOU/RBNS4iCVjTxZATEcPNcDPc9R3uyef3CTQugoSxtutvPnQ5Q05EDDfDzXDXb7jL11MRcgNNCDRuIQw5ETHcDDfDXefhPvxzedW6gSYgGjdwuh5jyImI4Wa4Ge66Dnflhm4oH6J1qwCuel7XYx/+I4aciBhuhpvhruNwH16+dF4fVLbCqOt42rWZIScihpvhZrjrOtwTrluAfoEmRNW1MAw5ETHcDDfDXefhrrgdHQ85rLpitGvNv+5+sbOz0/Kti4jhZrgZboa7PsM9YVkB+o3aBGBcY7RrGUNOxHAz3Aw3w13X4YaoVv5d/Y4ioQLXsZ67eNv+bQw5EcPNcDPcDHedhnvseivO6xfVhAhcCzDkRAw3w81wM9x1Hu4J90e0vLGbqOsUNR7ZfuAFhpyI4Wa4GW6Gu27DPeU6+gVIGFXXqjDkRAw3w81wM9x1Hu7Jp/cbaAKKOOC5we0DDDkRw81wM9wMdx2He/x3ADBanpGLxgXqOgw5EcPNcDPcDHcdh3vqcv0Atoqq63PEtQw5EcPNcDPcDHddh/tIG7ttFYirtuja14cYciKGm+FmuBnuOg735PP6AX3CUXQB6g4z5EQMN8PNcDPcdR3uSdet/SLyhFHtEog7xJATMdwMN8PNcNdzuKf8PiCqWwF0+Yx1B14fZsiJGG6Gm+FmuOs43JOXS4pqQgy6tAh3YC9DTsRwM9wMN8Ndz+GefHrSwCYE6DJAvHt34XmGnIjhZrgZboa7fsM9/rsph1ygCbHa5Tgmvpshp5PgZ9//QmPEmjV+I+tUscaoLjKwS0VkiVhdLNBWAzQJ0CCqjQKERDUvwHD5NZES6KAAvVAcMtBeUX1NjL7mWHlt5ZrkLrniMY/hZrgZboZ7PoZ74nKCpFhNGEgXoImd++xzDDlN55ff+9PFfl/DOxX2XT7V86A4V6BrjcIpb0AJ0fJzveJ5eLTnvjmO144IMqL6L7DyrIH3lGO1a+lNDxxiuBluhpvhnn/hnrAcINCkUSRU0eUzktjBkM97v7jnhnVGvQ4DvVQglxro2rHnT+Xz2Rze8+Hkh3vq89YK9DdQ/L0DbFl8w/3PMdwMN8PNcM/XcE8e06QACRHPVUF8xz6HIZ/j/uaeG9b5BB1G0SHQdgFWlJ63U0M7g+Ge/Jp+UQSbrSn+aMlXHu5luBluhpvhnsfhnvJ3JEWQMGpdtSa+7SBDPtv97/tuPN3xnHbAaxfIBgNdJqowU+Ja1+EeW3YYgs2O53xvwcYfbWO4GW6Gm+FmuKdeR2lGrhoXWPdfDgYY8jr3k/s6TzfW6zCCdoF2iOqyI0V6loZ77L3GCvQhEfv1BTc8vIfhZrgZboab4T7CfSq9cZdXrVvExVj3aYZ8xj16b+fbPEfaHdV2UXQY2KXHE+lZHu6x8/MicmtsZNet0ukWGW6Gm+FmuBnuqeGefF5SgK2icI2B+yuGvOoeeOCWt8EWO0TRLtB2o1haGdmpEZ7T4R47/1kH3tXNN21+ieFmuBluhpvhnj7cE343QFIVWx1R1/E8t2sgwpCfoP9+/y1nQe16EdPhqG0X6JLD0T0c1BqEewjQ7QLdYRS7jGivUekW9Q7AmF7/SHHIejrSP7J4aENnZ3HbPZ8LN3pOUL1is1rbLFYDMKbN8exKiKwU6OkCnCWq6wTwn2C4ASBjrF4Z2fTw4ww3w81wM9wM93GGe8rfWPqM/Amj2qWq7vqByHPCkE/r+/ffcpY4Toexdj2gHQZYPPbYmrFYVz/cB0TtPxuRp6D2WT+K29/9xR/sq8bfu/fu64K2OHiBqLxbgPcLtEOA0FsINwTqweLL0U0Pf4/hZrgZboab4X5r4Z78OCVF5QkRdBlV9z3zPOSqKndtvutM43kdUOkw0PUGurgy0pWPbRXD/YqouhBJOMb8asNnb9s1U2Oys/OaQGPI6YDVjwrwYQGibyLcEAUU8sXoxod+wHAz3Aw3w81wn3i4J8+iUqK61ah0GVN03zWwcE6HXFXlOz/+7lniYYPCW++otAt0UeVjNznSVQm31e1GkIDCFZ9xf+czt/TU43gduOPjTeI1fAywXxDg7OMNNwA1qh8Pb3pkM8PNcDPcDDfDfXLDPfk2UyK6FSpdMNbdueTA81fU8BjWVSi1/Ncff/csqNlgYDuM4n0AFpnJ0a1+uLeLVVeMJBpE6zbURx9GyKHbPnGFwH5LIOuOI9wQaA6ec1Hz1/7iRYab4Wa4GW6Gu3rhnnxeCsBWo9oFFfeVlXUeclW5efMPz1FjOwzQLkC7UW09coirGu6XRRA31rqe54tf8flvHJgTayy+fnlDX6BpkwA3CNR/jHBDBC80jfouks4HhxluhpvhZrgZ7tqEe/y+l58PKQPdKtAuIxI/c3nvczKTIVeV6x/74TnqyQZHtF1U1gu09fhCfBLDrfqSI4gDNq4ould++paDc3nbgL5br7lQoH8liuXThrv041fDGx+5g+FmuBluhpvhnplwV1x3eUau2CpAF5zqh7yzs9MMvm3JuRBpB2yHA10vioVTd52qarjVQF+GwnWgrk99iSs/vXFOh/pIDn3nk8scz/uFAOceI9zJorFrYzc+mhy7rA9ERDRTYiK4DMBlYi127G1Nbb/zs1sdaJdAEmtX9f3riYS8s7PT9J+38lwteh0CdCSh7zPQhZWBqMW8HpCXVNSFRdzf4MWvuqqzd74/8G3X39/d962r/q1jxAWwbppFW3yefAbAbZxxc8bNGTdn3Jxxz/yMe+JWxlMvkzKKrRDpUhQTa1elpw15Z2en2f/21ecZz2sXYIMDvA/QBeNjqzrhiGFHP1jJCc24VYCXDLQLVuPG50989qqvzPtQH03y1qveIYqnADQcZcYNUbzctOmRsxhuhpvhZrgZ7voP95TdzwBsFagrovFfNJvnn15yyTnwvA6BtEtp1XfL0eJbpXCrUd0GSNyousUGE//ylV/uY5LfRLxvufobAv3aNOEGIBc2bXr4Wa4qJyKaRSwkdrCx6bJdwchlu0JR7AlE1FoVU/GfsrVZ9Y1tpbUASIiD+Jeu/ApDfQJG/Pb2QEG+CCA2zbB/AADDTURU56HGwUATdgWj2BWKYncwglHxVX5Zhgiq/mG1FWAboK4CrngNiRuu/pN+Pjonz5KvPJxNffuqRyH43DThftfYTww3EVEdhfpAIIxdoSh2BWPYHYxgxDgTvwhFa3A3gBcAdVUQ9xd8iZsY6qoT0b8Dpgs33sZwExHVQah7AmHsDMWwuzyrHhVnwtdP1mJGDeB5hcSNaJffFLZ2XvGlAT46tVV07PM+z0y3yDKGm4hoRkLdjF2hGHaOrfo2PqDy+6Kr3GkBsHgki9X5IV00mv314pHM7Wd96c//shbr3OnoFuRP6x5seH26RaIMNxFRtUMtgu5AM3YFy6EOxTBa3pRMKo7JXd1QK5aMZLEmP4jV+TRW5wcRsEVIqeHvEuiWgduu/nX/t+XGhRsf/H981GaGdHba9C0fP65lGW4iopMc6p2hWOkz6lAUo8ZM2YWt2qFeOpLBKbl0OdaDCNrC+Gz7SLcvwDsh+vfJW6763wWf+fyirz54gI9m/WK4iYhOKNSRUqhDMewJRjFqHEzcZ7u6oTZQLBsPdboc6uKkYxkcd/Y/4i/aDclbr/pUy40P/RUfYYabiGjWh3p/IIJdoRh2h0oz6oKUQw3UZNW3gWLZ8BBOyafLsU4hYL2TuSFbiyh+mvr2VbdHT8tvlNn8taQMNxHR/OKVZ9S7QjHsbGrB3mAEBeNMPGJelTfpGgv12lwap+RSWJNPI+AVJxxdrQoEguuHXguepl+//KPyjcdG+WxguImI6jPUwSh2h6LYFSqFetQ4Uw+FW81Qq2L5yBBOzaVwai6JNbl0aUZdg9ueTIGPDDYE/la/fvl/YLwZbiKiGVda9R0tr/aOYV/5M+rDnw9Xfw8po4rlw4NYm0vhlPK/UqhL6ZSZ30nrg4MNwYd1y+VXcrU5w01EVOMZtUFPsBm7gzHsCcWwNxhFwZgJXxhTi1CvGB7C2lwSp2aTWJNPo7FiRl3trc7fCoFeMfRqYD+AL/FZxHATEVU11AeCEewJlUK9P1D+jHpCIKu81bcqVuYHcWouiVPLM+rG8oxatParv0/AdZlvfeyZ8KZHfsxnFsNNRHRSQ70vFMPeUAv2h6IojqdRJ32VbHU4qlg+nMbabAqnZgdwSnlGjdodwrSKU2/5H6lvXv107Oa/eJ3PNoabiOgthfpgMIp9TTHsD8bQHYqiKDLxu92rHGtHFSuG06UZdWZs1XdxNs6oj0mBJsd4D+qWyzv4eTfDTUR0XKHuDUaxvymG/aEWHAhGUBRTnk2PxboGoc6ncWo2iVNySawZX/U9NqOe8y7NvNZ4LYA/5zOS4SYimhrqUAQ9oRZ0h1pwIBSBB1Oz2XQp1BYry/tQn5obwOpcGg11vjFZtYnKt1K3XvmT2I2PJvksZbiJaJ6H+lAogp5gC3qaWtAbnBTq8Zl1lUOdT+OU8oy6FOpiKVj1sXtWHdAFPitfAXATx4LhJqJ5Fuq+UBS9oRgOhFpwKBiBJwaqtQu1Ty1W5AexJjuAU3NJrMwNomHsM2qGerp59+eSndfc3tL5YIpjwXAT0RwO9UAoikOhFhwMxdAfjMATGV/jrajNqu+xUK/JJbEyl0KDtRWrvvk4Haeo31f4YwC3cSgYbiKaK6E2DpKBCPpDLTgUimGgHOrSRLo2+1H71GJpPo012SRWZ5NYmU/BXxlqsNRvec4N+WPt7LxdOjstR4PhJqJZGup0MIKBYAsGQjEkJ8yox1Jdg1Dn0liVTWJVbgDLc2n41YMpb/HNUJ9UqzP+V9oBdHEoGG4imiWhHgpGkAq2INkUQyoQgRUBVCt2zKp+qJfkUliZTWJVdgBL86VQH/4+bKomo/L7DDfDTUR1yhoHmWAEg6EWpENRDAaisKVOl0Nd/dlsKdRJLM+lsDJTCrVPvTl5wJNZQfHvAXyeA8FwE1GdhDoXjCITimEo1IJMoBm2vOpba7jqe3EuieW5JJZnk1iSY6jrimDV8K0fWxe48ZHXOBgMNxHNQKiHAzHkQlFkQzHkAhFYHD4eWU1m1NbDolwKS3NJLM8OYFEuDZ9a7p5Vz5Nuz14MgOFmuImoFqEeDUYxHIwhH2rBcGO4NKNGxYy6ykcG81kPrbk0lmSTWJobwKJ8Gs6E3bNY6roPt5h3AtjMkWC4iehkv8EaB6PBGEaDUYyEYhhpbIZKxYxaazOjbs2l0ZYdwOJcEq35NBy1MMrds2bvEwvrOAgMNxGdpFB7wRiKoSgKwSgKjc1QEVhoxUS6yl/KYT0syKXQlkuiLZvEgnwKjur459MM9ewn0FM4Cgw3Eb0VxgcbjMKGovCCMXiBJigOb0xWC4710JJLYUF2AAtzSbTk06VQz4Xvo6ajTLjRylFguInouELtQAJRIBSFDcagjWEoML5BGWpxCFHrIZpNIZZLoiWXRGw4DWOVn1HPr3CHOAoMNxEdgRgfnEAEJhiFhKJAOdQT13pXf9V3OJdCNDuAaC6FyORQc0Y9/56XQISjwHATUTnU/mAE/kAUTigK01ha9W1reGQyUw51OJ9EczaJ8PBgaUMyfkZNxHATzXfG+NAYbEZDMAZ/MAKnofwZNXTizLrKoQ7mUmjKDaApl0RoeAhmbD9qfkZNxHATzfdQB4JRBAIRNAYj8Fes+tYJW35XM9RFNObSCOSSCOWSCEwINY9MRsRwE81jjvEhFIwgFIwiGIigobFpwnG+azGXFVtEIJdCQy6FQC6JxuEhiJa+ldHwyGREDDfRvH6BOT6EAxE0BSJoCkbQ2NA0cUZdo1D7cmn4ckk05JLwD2cgFYcQJSKGm2hehzoSaEZzIIJwMIJgQ+1n1LBFOPk0TC4FJ5eEbzgDgeXn00QMNxEBQMDXiEXNbWgJtSA0PqPW2iXSFoF8GpJLwWRTMCPlUIP7UBMx3EQ0LtzQhNUtK9ASjI1HuhaZVK8Im0/B5lLQfAoYzvBgJ0QMNxEd9UVjHJzashLLIotr8sUcaoso5FMo5lLw8mno8FB5S++x/aiJiOEmoqPMskM4d/HpaPQ1Vu02rFfAaH4Qo/kUCvkUvJHM+OfTDDURMdxEx6k11IJz2tbBiDmpq8StV0R+OI2RfAoj+TSK5VBzRk1EDDfRW7S4aQHOaV13UirqeQXkhgeRz6eQz6UxOpqt+OYshpqIGG6iE7IgEME5resgIm9pW/GiV0BmeBDZfBrZfAqjozl+xSURMdxE1RDyNeK8RafByPEntmiLGMynMJQfRCafxshodvw432Orv4mIGG6ik0xEcF7bOvjN8b1MBocH0ZPuQTqXBLT0jdhjq7+JiBhuoipbE1mCaGPTMWfaRVvE631vYCDbD1Rs/U1ExHAT1Uij04C10WXHXG64OIJtPS9hpJBnrImI4SaaKWtjy+AYZ9pDoY0UR/F89zaMFkcZbSKqGcMhIJo82/Zjebht2mWsWrx4cAdGiqMcMCJiuIlm0opwKxyZ/qWxJ7UfmdEsB4uIGG6imbY83Drt+bnCMPamezhQRMRwE820Jn8AYX9w2mV2pfbDquVgERHDTTTTFgYi054/6hVwKNvPgSIihpuoHsQaw9OefyiXhOV3XhMRw01UH461mjyZT3OQiIjhJqoXIV/DtOdnRnMcJCJiuInqhe8YxyXnfttExHAT1dMLQqY/Bhq3JicihpuIiIgYbiIiIoabiIiIGG4iIiJiuImIiBhuIiIiYriJiIiI4SYiImK4iYiIiOEmIiIihpuIiIjhJiIiIoabiIiIGG4iIiKGm4iIiBhuIiIiYriJiIgYbiIiImK4iYiIiOEmIiJiuImIiIjhJiIiIoabiIiI4SYiIiKGm4iIiBhuIiIihpuIiIgYbiIiImK4iYiIGG4iIiJiuImIiIjhJiIiYriJiIiI4SYiIiKGm4iIiOEmIiIihpuIiIgYbiIiIoabiIiIGG4iIiJiuImIiBhuIiIiYriJiIgYbg4BERERw01EREQMNxEREcNNREREDDcREREx3ERERAw3ERERMdxERETEcBMRETHcRERExHATERERw01ERMRwExEREcNNREREDDcRERHDTURERAw3ERERMdxEREQMNxERETHcRERExHATEREx3ERERMRwExEREcNNRETEcBMRERHDTURERAw3ERERw01EREQMNxERETHcREREDDcREREx3ERERMRwExERMdxERETEcBMRERHDTURExHATERERw01EREQMNxEREcNNREREDDcREREx3ERERAw3ERERMdxERETEcBMRETHcRERExHATERERw01ERMRwExEREcNNREREDDcRERHDTURERAw3ERERMdxEREQMNxERETHcRERExHATEREx3ERERMRwExEREcNNRETEcBMRERHDTTRjrOr0LxjhS4aIGG6iulG03rTnN/oaOEhExHAT1YtccWTa88MNIQ4SETHcRPUiW8hPe35LIMJBIiKGm6hepEay056/qGkhP+cmIoabqF70D6enPd/v+LCoaQEHiogYbqJ6kCkM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";

var Foot = (function (_ref) {
  var Data = _ref.Data;
  var info = Data.info.map(function (e, i) {
    return React.createElement("div", {
      key: i,
      className: styles$5.body_info_item
    }, React.createElement("span", {
      className: styles$5.body_info_item_title
    }, e.title), React.createElement("span", {
      className: styles$5.body_info_item_colon
    }, ":"), React.createElement("span", {
      className: styles$5.body_info_item_value
    }, e.value));
  });
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: styles$5.br
  }), React.createElement("div", {
    className: styles$5.body
  }, React.createElement("img", {
    src: foot_2,
    className: styles$5.body_bg_1
  }), React.createElement("img", {
    src: "http://xm.gwtj.net:8888/upload/temp/tjbg_fm1.png",
    crossOrigin: "anonymous",
    className: styles$5.body_bg_2
  }), React.createElement("div", {
    className: styles$5.body_text
  }, React.createElement("div", {
    className: styles$5.body_text_title
  }, Data.text.title), React.createElement("pre", {
    className: styles$5.body_text_content
  }, Data.text.content)), React.createElement("div", {
    className: styles$5.body_info
  }, info)));
});

/**
 * 默认的渲染模版
 */

var Default = (function (_ref) {
  var Data = _ref.Data,
      readyPromise = _ref.readyPromise;
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "".concat(styles$1.cover, " ").concat(styles$1.A4)
  }, React.createElement(Cover, {
    Data: Data
  })), React.createElement(Page, {
    Data: Data,
    readyPromise: readyPromise
  }), React.createElement("div", {
    className: "".concat(styles$1.A4)
  }, React.createElement(Foot, {
    Data: Data.foot
  })));
});

var StencilType;

(function (StencilType) {
  StencilType["Default"] = "default";
})(StencilType || (StencilType = {}));

var Stencil = (function (_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? StencilType.Default : _ref$type,
      Data = _ref.Data,
      readyPromise = _ref.readyPromise;

  switch (type) {
    case StencilType.Default:
      return React.createElement(Default, {
        Data: Data,
        readyPromise: readyPromise
      });

    default:
      return null;
  }
});

/**
 * html转base64图片
 * @param html
 */

function html2Base64(_x) {
  return _html2Base.apply(this, arguments);
}

function _html2Base() {
  _html2Base = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(html) {
    var canvas, base64;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return html2canvas(html, {
              useCORS: true,
              allowTaint: true,
              scrollX: 0,
              scrollY: 0,
              scale: 3
            });

          case 2:
            canvas = _context4.sent;
            base64 = canvas.toDataURL('image/jpeg', 1.0);
            return _context4.abrupt("return", base64);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _html2Base.apply(this, arguments);
}

var Preview = forwardRef(function (_ref, ref) {
  var hideRender = _ref.hideRender,
      data = _ref.data;
  var divRef = useRef(null);
  var readyPromise = useMemo(function () {
    //模版计算，渲染完毕的标识
    var res = null;
    var rej = null;
    var promise = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });
    return {
      promise: promise,
      res: res,
      rej: rej
    };
  }, []);
  useImperativeHandle(ref, function () {
    return {
      print: function () {
        var _print = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var hide;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  hide = message.loading('绘制中...', 0);
                  _context.next = 3;
                  return readyPromise.promise;

                case 3:
                  _context.t0 = handlePrint;

                  if (!_context.t0) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 7;
                  return handlePrint();

                case 7:
                  hide();

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function print() {
          return _print.apply(this, arguments);
        }

        return print;
      }(),
      pdf: function () {
        var _pdf = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var hide;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  hide = message.loading('生成中...', 0);
                  _context2.next = 3;
                  return readyPromise.promise;

                case 3:
                  _context2.next = 5;
                  return handlePdf();

                case 5:
                  hide();

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function pdf() {
          return _pdf.apply(this, arguments);
        }

        return pdf;
      }()
    };
  }); // 直接打印

  var handlePrint = useReactToPrint({
    content: function content() {
      return divRef.current;
    },
    documentTitle: '体检报告',
    bodyClass: styles.printWindows,
    onBeforePrint: function onBeforePrint() {
      console.log('完毕123');
    }
  }); // 生成PDF

  var handlePdf = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var doc, list, index, element, base64;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(divRef.current === null)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              doc = new jsPDF();
              list = divRef.current.children;
              document.documentElement.classList.add('hide-scrollbar');
              index = 0;

            case 6:
              if (!(index < list.length)) {
                _context3.next = 16;
                break;
              }

              if (index !== 0) {
                doc.addPage();
              }

              element = list[index];
              _context3.next = 11;
              return html2Base64(element);

            case 11:
              base64 = _context3.sent;
              //转base64图片
              doc.addImage(base64, 'JPEG', 0, 0, 210, 297);

            case 13:
              index++;
              _context3.next = 6;
              break;

            case 16:
              doc.save('体检报告.pdf');
              document.documentElement.classList.remove('hide-scrollbar');

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handlePdf() {
      return _ref2.apply(this, arguments);
    };
  }();

  return React.createElement("div", {
    className: "".concat(styles.body, " ").concat(hideRender ? styles.hide : ''),
    ref: divRef
  }, React.createElement(Stencil, {
    Data: data,
    type: StencilType.Default,
    readyPromise: {
      res: readyPromise.res,
      rej: readyPromise.rej
    }
  }));
});

var css$7 = ".index_drawer__3OjhR {\n  position: fixed;\n  right: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: flex-end;\n  z-index: 2;\n}\n.index_body__1HyO4 {\n  display: flex;\n  flex-direction: column;\n}\n.index_header__3alTr {\n  width: 100%;\n  background-color: #fff;\n  height: 50px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 20px;\n}\n.index_content__O5mRo {\n  height: 100%;\n  overflow-y: scroll;\n}\n";
var styles$6 = {"drawer":"index_drawer__3OjhR","body":"index_body__1HyO4","header":"index_header__3alTr","content":"index_content__O5mRo"};
styleInject(css$7);

var Drawer = (function (_ref) {
  var visible = _ref.visible,
      children = _ref.children,
      onClose = _ref.onClose,
      title = _ref.title,
      button = _ref.button;
  return React.createElement(React.Fragment, null, visible && ReactDOM.createPortal(React.createElement("div", {
    className: styles$6.drawer,
    onClick: function onClick() {
      return onClose();
    }
  }, React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    className: styles$6.body
  }, React.createElement("div", {
    className: styles$6.header
  }, React.createElement("div", {
    className: styles$6.header_left
  }, title), React.createElement("div", {
    className: styles$6.header_right
  }, button)), React.createElement("div", {
    className: styles$6.content
  }, children))), document.getElementById('root')));
});

var css$8 = "";
var styles$7 = {};
styleInject(css$8);

function PageToPrintList(page) {
  var arr = JSON.parse(JSON.stringify(page));
  var list = arr.filter(function (e) {
    return e.isPrint;
  });
  return list.map(function (e) {
    if (e.type === ComponentType.Table) {
      var table = e.data;
      var data = table.data.filter(function (e) {
        return e.isPrint;
      });
      return _objectSpread2(_objectSpread2({}, e), {}, {
        data: _objectSpread2(_objectSpread2({}, e.data), {}, {
          data: data
        })
      });
    }

    return e;
  });
}

var index = forwardRef(function (_ref, ref) {
  _objectDestructuringEmpty(_ref);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPrint = _useState4[0],
      setIsPrint = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  var previewRef = useRef(null);
  var hidePreviewRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      open: function open(data) {
        setData({
          info: data.info,
          page: PageToPrintList(data.page),
          foot: data.foot
        });
        setVisible(true);
      },
      print: function print(data) {
        setData({
          info: data.info,
          page: PageToPrintList(data.page),
          foot: data.foot
        });
        setIsPrint(true);
      }
    };
  });
  useEffect(function () {
    if (isPrint) {
      var _hidePreviewRef$curre;

      (_hidePreviewRef$curre = hidePreviewRef.current) === null || _hidePreviewRef$curre === void 0 ? void 0 : _hidePreviewRef$curre.print().then(function () {
        setIsPrint(false);
      });
    }
  }, [isPrint]);
  return React.createElement("div", null, visible && React.createElement(Drawer, {
    visible: visible,
    onClose: function onClose() {
      return setVisible(false);
    },
    title: "\u9884\u89C8",
    button: React.createElement(Space, {
      className: styles$7.right,
      direction: "horizontal",
      size: 30
    }, React.createElement(Button, {
      onClick: function onClick() {
        var _previewRef$current;

        return (_previewRef$current = previewRef.current) === null || _previewRef$current === void 0 ? void 0 : _previewRef$current.print();
      }
    }, "\u4E00\u952E\u6253\u5370"), React.createElement(Button, {
      onClick: function onClick() {
        var _previewRef$current2;

        return (_previewRef$current2 = previewRef.current) === null || _previewRef$current2 === void 0 ? void 0 : _previewRef$current2.pdf();
      }
    }, "\u751F\u6210PDF"))
  }, React.createElement(Preview, {
    ref: previewRef,
    hideRender: false,
    data: data
  })), isPrint && React.createElement(Preview, {
    ref: hidePreviewRef,
    data: data,
    hideRender: isPrint
  }));
});

export { Drawer, Preview, index as Report };
