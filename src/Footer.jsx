import './Footer.css'
function Footer () {
    const year = new Date().getFullYear();
  
    return <footer id="footer">Copyright © <a href="https://www.lucasgover.com/projects">Lucas Gover</a> {year}</footer>;
};
  
export default Footer;