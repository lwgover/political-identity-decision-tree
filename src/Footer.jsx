function Footer () {
    const year = new Date().getFullYear();
  
    return <footer>{`Copyright © Lucas Gover ${year}`}</footer>;
};
  
export default Footer;