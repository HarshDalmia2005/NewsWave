import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo2.png'
import { countryCodesArray, countryCodeMapping } from './countries';

const Header = () => {
    const categoriesArray = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];
    return (
        <div>
            <Navbar expand="lg" className="bg-dark" fixed='top'>
                <Container>
                    <Navbar.Brand href="/" className='text-white font-bold flex items-center'><img src={logo} alt="" className='h-12 w-12 mr-5 bg-transparent rounded-full' />NewsWave</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ml-96 space-x-10">
                            <Nav.Link href="/" className='ml-5 text-white'>All News</Nav.Link>
                            <NavDropdown title="Top Headlines" id="dark-nav-dropdown" className='text-white ml-5'>
                                {categoriesArray.map((item, index) => <NavDropdown.Item href={`/top-headlines/${item}`} className='bg-dark text-white' key={index} >{item}</NavDropdown.Item>)}
                            </NavDropdown>
                            <NavDropdown title="Country" id="dark-nav-dropdown" className='ml-5'>
                                <div className='scrollable-dropdown'>
                                    {countryCodesArray.map((item, index) =>
                                        <NavDropdown.Item href={`/country/${item}`} className='bg-dark text-white' key={index}>{countryCodeMapping[item]}</NavDropdown.Item>
                                    )}
                                </div>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header