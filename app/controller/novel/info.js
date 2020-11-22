const {
  Result,
  Redis,
  Dom,
  Request,
  WS,
  Logger
} = require(global.prefixPath + '/common');
const { origin } = require(global.prefixPath + '/config');

async function info(url, originKey, socketId) {
  WS.emit('process', '正在解析参数...', socketId);

  if(!url || !isUrl(url)) {
    WS.emit('processError', '错误的地址', socketId);
    return Result.fail('错误的地址');
  }

  if (!origin.hasOwnProperty(originKey)) {
    WS.emit('processError', '错误的来源', socketId);
    return Result.fail('错误的来源');
  }

  const cacheData = await Redis.get('data', 'book-info-' + url);

  if (cacheData) {
    WS.emit('process', '检测到缓存数据...', socketId);
    const data = Object.assign(
      JSON.parse(String(cacheData)),
      { cache: true }
    );
    WS.emit('processSuccess', '提取缓存', socketId);
    return Result.success(data);
  }

  const data = await getBookInfo(url, origin[originKey], socketId).catch(() => false);

  if (data === false) {
    return Result.fail('系统错误');
  }

  await Redis.set(
    'data',
    `book-info-${url}`,
    JSON.stringify(data),
    60 * 60
  );

  return Result.success(data);
}

async function getBookInfo(url, currentOrigin, socketId) {
  const dom = new Dom(currentOrigin);
  dom.setData('url', url);

  if (!dom.isOriginUrl(url)) {
    WS.emit('processError', '无效地址', socketId);
    return Result.fail('无效地址');
  }

  WS.emit('process', '正在获取页面...', socketId);
  const htmlResult = await Request({
    method: 'GET',
    url,
  }, dom.searchPageCode);

  if (htmlResult === false) {
    WS.emit('processError', '页面获取失败', socketId);
    return Result.fail('页面获取失败');
  }

  WS.emit('process', '正在解析页面...', socketId);
  const bookInfo = dom.getBookInfo(htmlResult);

  WS.emit('processSuccess', '解析完成...', socketId);

  return bookInfo;
}

function isUrl(url) {
  return /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/.test(url);
}

module.exports = info;
