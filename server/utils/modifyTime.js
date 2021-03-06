const modifyTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const modifiedTime = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  return modifiedTime;
};

module.exports = modifyTimestamp;
