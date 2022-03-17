const loginUrl = 'http://192.168.17.145:6445/numas/biz/index.html?config=%7B%22compCode%22%3A2003%2C%22title%22%3A%22%E7%A7%91%E5%AE%A4%E6%8E%92%E7%8F%AD%22%2C%22header%22%3Afalse%7D&timestamp=1647497861450#/schedulemanage/scheduling';
const scUrl = 'http://192.168.17.145:6445/numas/biz/index.html?config=%7B%22compCode%22%3A2003%2C%22title%22%3A%22%E7%A7%91%E5%AE%A4%E6%8E%92%E7%8F%AD%22%2C%22header%22%3Afalse%7D&timestamp=1647498662194#schedulemanage/scheduling';
const Demo = () => {
  return (
    <iframe
      src={scUrl}
      width="100%"
      height="700"
    />
  );
};

export default Demo;
