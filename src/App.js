import React, {useState, useEffect} from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Logo from "./components/UI/Logo/Logo";
import NavList from "./components/UI/NavList/NavList";
import HamburgerMenu from 'react-hamburger-menu';
import SideMenu from "./components/SideMenu/SideMenu";
import Main from "./components/Main/Main";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";
import Footer from "./components/Footer/Footer";


function battleTagValidation(value) {
    const validationObject = {};

    if (!value || !value.trim()) {
        validationObject.error = 'This field must contain some characters!';
        return validationObject;
    }

    if (!/^[\D]{2,15}\b [\D]{2,4}\b [a-z][\D|\d]{2,11}\b#[\d]{4,5}$/ig.test(value.trim())) {
        validationObject.error = 'Invalid format!';
        return validationObject;
    }

    const normalizedPlatforms = {
        'pc': 'pc',
        'nintendo': 'nintendo-switch',
        'ns': 'nintendo-switch',
        'switch': 'nintendo-switch',
        'nintendoswitch': 'nintendo-switch',
        'nintendo-switch': 'nintendo-switch',
        'xbox': 'xbl',
        'xboxone': 'xbl',
        'xbo': 'xbl',
        'xbl': 'xbl',
        'playstation': 'psn',
        'playstationfour': 'psn',
        'ps': 'psn',
        'psfour': 'psn',
        'psn': 'psn'
    };

    const normalizedRegions = {
        'usa': 'us',
        'america': 'us',
        'us': 'us',
        'europe': 'eu',
        'euro': 'eu',
        'eu': 'eu',
        'asia': 'asia',
        'as': 'asia'
    };

    let splittedValue = value.split(' ');

    splittedValue[0] = normalizedPlatforms[splittedValue[0].toLowerCase()] || null;
    splittedValue[1] = normalizedRegions[splittedValue[1].toLowerCase()] || null;

    if (splittedValue.includes(null)) {
        validationObject.error = 'Platform or region invalid!';
        return validationObject;
    }

    validationObject.success = true;
    validationObject.value = splittedValue;

    return validationObject;
}


function saveToLocalStorage(object) {

    const storage = JSON.parse(localStorage.getItem('storage'))  || [];

    if(storage.length === 18) { //if the history storage length is 18(max length), then delete the first element from the end, which doesn't locked
        for(let i = storage.length - 1; i > 0; i--){
            if(!storage[i].isLocked){
                storage.splice(i, 1);
                break;
            }
        }
    }

    storage.unshift(object);

    localStorage.setItem('storage', JSON.stringify(storage));
}


function App() {

    const [openedPage, setOpenedPage] = useState(0);
    const [isSideBarMenuOpen, setIsSideBarMenuOpen] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState(null);
    const [searchRequest, setSearchRequest] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [openedPage]);

    useEffect(() => {
        if(!searchResult) return;

        const object = {
            avatarURL: searchResult.icon,
            nickName: searchResult.name,
            timestamp: Date.now(),
            searchRequest,
            isLocked: false
        };

        saveToLocalStorage(object);
    }, [searchResult]);

    const navElementNames = ['SEARCH', 'HISTORY'];

    function searchProfile(request) {
        const validationResult = battleTagValidation(request);

        if (validationResult.success) {
            setSearchErrorMessage(null);
            setSearchRequest(validationResult.value.join(' '));

            let [platform, region, battleTag] = validationResult.value;
            battleTag = battleTag.replace('#', '-');

            fetch(`https://ow-api.com/v1/stats/${platform}/${region}/${battleTag}/complete`)
                .then(response => response.json())
                .then(data => {
                    if (!data) setSearchErrorMessage('Something went wrong...');
                    else if (data.error) setSearchErrorMessage(data.error);
                    else if (data.private) setSearchErrorMessage('This profile is private!');
                    else {
                        setSearchErrorMessage(null);
                        setSearchResult(data);
                    }
                })
                .catch(error => {
                    setSearchErrorMessage(error.toString());
                });
        } else setSearchErrorMessage(validationResult.error);
    }

    return (
        <div className='container'>

            <Header>
                <Logo
                    mainLogoURL='https://tinyurl.com/yc996fkp'
                    smallScreenLogoURL='https://tinyurl.com/y8g6qp5a'
                />
                <NavList
                    elementNames={navElementNames}
                    setSelectedPage={setOpenedPage}
                />
                <HamburgerMenu
                    className='hamburger-menu'
                    isOpen={isSideBarMenuOpen}
                    menuClicked={() => setIsSideBarMenuOpen(!isSideBarMenuOpen)}
                    strokeWidth={3}
                    color='white'
                />
                {isSideBarMenuOpen &&
                    <SideMenu
                        className='page-header__side-menu'
                        elementNames={navElementNames}
                        setSelectedPage={setOpenedPage}
                        activeElement={openedPage}
                        closeSideMenu={() => setIsSideBarMenuOpen(false)}
                    />
                }
            </Header>

            <Main backgroundURL='https://tinyurl.com/ybamwhem'>
                {openedPage === 0 &&
                    <>
                        <div className='search-wrapper'>
                            <Search
                                placeholder='platform region battletag'
                                onSearch={searchProfile}>
                                {searchErrorMessage &&
                                    <span className='search-wrapper__error-message'>{searchErrorMessage}</span>
                                }
                            </Search>
                        </div>
                        {searchResult &&
                            <Profile key={searchResult.name} data={searchResult}/>
                        }
                    </>
                }
                {openedPage === 1 &&
                    <History/>
                }
            </Main>

            <Footer>
                <a
                    className='page-footer__link'
                    href='https://github.com/jdrevan/react-overwatch-profile-checker'
                    rel='noopener noreferrer'
                    target='_blank'>View source on Github
                </a>
                <span className='page-footer__text'>@2020 Overwatch Profile Checker</span>
            </Footer>

        </div>
    );
}

export default App;
