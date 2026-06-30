import Flags from "./indexBody/Flags";
import Services from "./indexBody/services-cards";
import WhyUs from "./indexBody/whyUs";
import Hero from "./indexBody/Hero";
import Certifications from "./indexBody/Certifications";
import ContactSection from "../Contact/ContactSection.jsx";
import '../../index.css';

const Body = () => {

    return (
        <div className="body">
        <Hero />
        <Flags />
        <Certifications />
        <Services />
        
       

        </div>

    )
}

export default Body;