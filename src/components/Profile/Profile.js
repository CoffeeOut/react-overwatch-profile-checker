import React, { useState } from 'react';
import './Profile.scss';
import ProfileHeader from "./Header/Header";
import Table from "./Table/Table";
import Masonry from "react-masonry-css";
import {default as Select} from "react-select";


const heroesList = [
    {value: 'allHeroes', label: 'ALL HEROES', url: 'https://tinyurl.com/y8bfkvvc'},
    {value: 'ana', label: 'ANA', url: 'https://tinyurl.com/yaawpajm'},
    {value: 'ashe', label: 'ASHE', url: 'https://tinyurl.com/yaurd3lo'},
    {value: 'baptiste', label: 'BAPTISTE', url: 'https://tinyurl.com/ycbnchxl'},
    {value: 'bastion', label: 'BASTION', url: 'https://tinyurl.com/ybxl7bwe'},
    {value: 'brigitte', label: 'BRIGITTE', url: 'https://tinyurl.com/y7b8wrpz'},
    {value: 'dVa', label: 'D.VA', url: 'https://tinyurl.com/ybds8qhp'},
    {value: 'doomfist', label: 'DOOMFIST', url: 'https://tinyurl.com/y9pmehpg'},
    {value: 'echo', label: 'ECHO', url: 'https://tinyurl.com/y7gjgnd2'},
    {value: 'genji', label: 'GENJI', url: 'https://tinyurl.com/ya95zysp'},
    {value: 'hanzo', label: 'HANZO', url: 'https://tinyurl.com/yaal5s8e'},
    {value: 'junkrat', label: 'JUNKRAT', url: 'https://tinyurl.com/y6veqefm'},
    {value: 'lucio', label: 'LUCIO', url: 'https://tinyurl.com/ybewf28e'},
    {value: 'mccree', label: 'MCCREE', url: 'https://tinyurl.com/yaaog9yq'},
    {value: 'mei', label: 'MEI', url: 'https://tinyurl.com/y9stlznx'},
    {value: 'mercy', label: 'MERCY', url: 'https://tinyurl.com/y9bygogj'},
    {value: 'moira', label: 'MOIRA', url: 'https://tinyurl.com/ybjdruee'},
    {value: 'orisa', label: 'ORISA', url: 'https://tinyurl.com/y9ywg3y2'},
    {value: 'pharah', label: 'PHARAH', url: 'https://tinyurl.com/yckq8h3a'},
    {value: 'reaper', label: 'REAPER', url: 'https://tinyurl.com/y7u5wey7'},
    {value: 'reinhardt', label: 'REINHARDT', url: 'https://tinyurl.com/ydx8g3ea'},
    {value: 'roadhog', label: 'ROADHOG', url: 'https://tinyurl.com/ydb4fejk'},
    {value: 'sigma', label: 'SIGMA', url: 'https://tinyurl.com/y7ecotes'},
    {value: 'soldier76', label: 'SOLDIER 76', url: 'https://tinyurl.com/ybxmehbl'},
    {value: 'sombra', label: 'SOMBRA', url: 'https://tinyurl.com/y8y4d6q6'},
    {value: 'symmetra', label: 'SYMMETRA', url: 'https://tinyurl.com/yblf7ruh'},
    {value: 'torbjorn', label: 'TORBJORN', url: 'https://tinyurl.com/yc7n2pz9'},
    {value: 'tracer', label: 'TRACER', url: 'https://tinyurl.com/ybdedwev'},
    {value: 'widowmaker', label: 'WIDOWMAKER', url: 'https://tinyurl.com/ycr6athr'},
    {value: 'winston', label: 'WINSTON', url: 'https://tinyurl.com/yd7abtsu'},
    {value: 'wreckingBall', label: 'WRECKING BALL', url: 'https://tinyurl.com/yco9kbqq'},
    {value: 'zarya', label: 'ZARYA', url: 'https://tinyurl.com/y74lmzow'},
    {value: 'zenyatta', label: 'ZENYATTA', url: 'https://tinyurl.com/yb5r32tj'},
];

const gameModesList = [
    {value: 'competitive', label: 'COMPETITIVE', url: 'https://tinyurl.com/yd942owc'},
    {value: 'quickPlay', label: 'QUICK PLAY', url: 'https://tinyurl.com/y8ee2t3q'}
];

function countWinRate(played, won) {
    if (!played || !isFinite(won)) return null;
    return Math.round(won * 100 / played) + '%';
}


const Profile = ({data}) => {

    const [selectedHero, setSelectedHero] = useState(heroesList[0]);
    const [selectedGameMode, setSelectedGameMode] = useState(gameModesList[0]);

    const selectedGameModeData = data[selectedGameMode.value + 'Stats'];
    const selectedHeroData = selectedGameModeData.careerStats[selectedHero.value];

    const highestRank = !!data.ratings &&
        [].concat(data.ratings)
            .sort((prevRank, nextRank) => prevRank.level - nextRank.level)
            .reverse()[0]; //if the player has been calibrated, this variable will contain data of the highest rank

    const selectedSettingsStyle = {
        backgroundImage: `url("${selectedHero.url}"), url("${selectedGameMode.url}")`
    };

    const filteredHeroesList = heroesList.filter(hero => Object.keys(selectedGameModeData.careerStats).includes(hero.value));
    //this variable contains filtered heroes list(only heroes, which player played)

    const filteredGameModesList = gameModesList.filter(gameMode => Object.keys(data[gameMode.value + 'Stats'].careerStats).includes(selectedHero.value));
    //this variable contains filtered game modes list(only game mods, where player played selected hero)

    const masonryBreakPointCols = {
        default: 3,
        1200: 2,
        768: 1
    };

    return (
        <div className='profile'>

            <ProfileHeader
                avatarURL={data.icon}
                borderURL={data.levelIcon}
                starsURL={data.prestigeIcon}
                battleTag={data.name}
                highestRank={highestRank}
            />

            <Masonry
                breakpointCols={masonryBreakPointCols}
                className='profile-tables-wrapper'
                columnClassName='profile-tables-wrapper__column'>

                <div className='profile-tables-wrapper__control-panel'>
                    <Select
                        className='control-panel__select'
                        options={filteredHeroesList}
                        onChange={setSelectedHero}
                        value={selectedHero}
                        defaultValue={selectedHero}
                        isSearchable={true}
                    />
                    <div
                        className='control-panel__selectedSettings'
                        style={selectedSettingsStyle}
                    />
                    <Select
                        className='control-panel__select'
                        options={filteredGameModesList}
                        onChange={setSelectedGameMode}
                        value={selectedGameMode}
                        defaultValue={selectedGameMode}
                        isSearchable={false}
                    />
                </div>

                <Table
                    title='CAREER'
                    keys={[
                        'NICKNAME',
                        'LEVEL',
                        'GAMES WON',
                        'AVERAGE RATING'
                    ]}
                    values={[
                        data.name,
                        data.prestige * 100 + data.level,
                        data.gamesWon,
                        data.rating || '-'
                    ]}
                />

                {!!data.ratings &&
                    <Table
                        title='RATINGS'
                        keys={[].concat(data.ratings).map(rating => rating.role.toUpperCase())}
                        values={[].concat(data.ratings).map(rating =>
                            <>
                                <img className='table-row__image' src={rating.rankIcon} alt='rank icon'/>
                                <span>{rating.level}</span>
                            </>
                        )}
                    />
                }

                <Table
                    title={'GENERAL: ' + selectedHero.label}
                    keys={[
                        'GAMES PLAYED',
                        'GAMES WON',
                        'GAMES LOST',
                        'GAMES DRAW',
                        'WINRATE',
                        'TIME PLAYED',
                        'CARDS',
                        'GOLD MEDALS',
                        'SILVER MEDALS',
                        'BRONZE MEDALS'
                    ]}
                    values={[
                        selectedHeroData.game && selectedHeroData.game.gamesPlayed,
                        selectedHeroData.game && selectedHeroData.game.gamesWon,
                        selectedHeroData.game && selectedHeroData.game.gamesLost,
                        selectedHeroData.game && selectedHeroData.game.gamesTied,
                        countWinRate(
                            selectedHeroData.game && selectedHeroData.game.gamesPlayed,
                            selectedHeroData.game && selectedHeroData.game.gamesWon
                        ),
                        selectedHeroData.game && selectedHeroData.game.timePlayed,
                        selectedHeroData.matchAwards && selectedHeroData.matchAwards.cards,
                        selectedHeroData.matchAwards && selectedHeroData.matchAwards.medalsGold,
                        selectedHeroData.matchAwards && selectedHeroData.matchAwards.medalsSilver,
                        selectedHeroData.matchAwards && selectedHeroData.matchAwards.medalsBronze
                    ]}
                />

                <Table
                    title={'COMBAT: ' + selectedHero.label}
                    keys={[
                        'ELIMINATIONS',
                        'DAMAGE DONE',
                        'BARRIER DAMAGE DONE',
                        'OBJECTIVE KILLS',
                        'HEALING DONE',
                        'OBJECTIVE TIME',
                        'OFFENSIVE ASSISTS',
                        'DEFENSIVE ASSISTS',
                        'ON FIRE',
                        'DEATHS'
                    ]}
                    values={[
                        selectedHeroData.combat && selectedHeroData.combat.eliminations,
                        selectedHeroData.combat && selectedHeroData.combat.damageDone,
                        selectedHeroData.combat && selectedHeroData.combat.barrierDamageDone,
                        selectedHeroData.combat && selectedHeroData.combat.objectiveKills,
                        selectedHeroData.assists && selectedHeroData.assists.healingDone,
                        selectedHeroData.combat && selectedHeroData.combat.objectiveTime,
                        selectedHeroData.assists && selectedHeroData.assists.offensiveAssists,
                        selectedHeroData.assists && selectedHeroData.assists.defensiveAssists,
                        selectedHeroData.combat && selectedHeroData.combat.timeSpentOnFire,
                        selectedHeroData.combat && selectedHeroData.combat.deaths
                    ]}
                />

                <Table
                    title={'BEST: ' + selectedHero.label}
                    keys={[
                        'ELIMINATIONS',
                        'DAMAGE DONE',
                        'BARRIER DAMAGE DONE',
                        'OBJECTIVE KILLS',
                        'HEALING DONE',
                        'OBJECTIVE TIME',
                        'OFFENSIVE ASSISTS',
                        'DEFENSIVE ASSISTS',
                        'ON FIRE'
                    ]}
                    values={[
                        selectedHeroData.best && selectedHeroData.best.eliminationsMostInGame,
                        selectedHeroData.best && selectedHeroData.best.allDamageDoneMostInGame,
                        selectedHeroData.best && selectedHeroData.best.barrierDamageDoneMostInGame,
                        selectedHeroData.best && selectedHeroData.best.objectiveKillsMostInGame,
                        selectedHeroData.assists && selectedHeroData.assists.healingDoneMostInGame,
                        selectedHeroData.best && selectedHeroData.best.objectiveTimeMostInGame,
                        selectedHeroData.assists && selectedHeroData.assists.offensiveAssistsMostInGame,
                        selectedHeroData.assists && selectedHeroData.assists.defensiveAssistsMostInGame,
                        selectedHeroData.best && selectedHeroData.best.timeSpentOnFireMostInGame
                    ]}
                />

                <Table
                    title={'AVERAGE PER 10 MIN: ' + selectedHero.label}
                    keys={[
                        'ELIMINATIONS',
                        'DAMAGE DONE',
                        'BARRIER DAMAGE DONE',
                        'OBJECTIVE KILLS',
                        'HEALING DONE',
                        'OBJECTIVE TIME',
                        'OFFENSIVE ASSISTS',
                        'DEFENSIVE ASSISTS',
                        'ON FIRE',
                        'DEATHS'
                    ]}
                    values={[
                        selectedHeroData.average && selectedHeroData.average.eliminationsAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.allDamageDoneAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.barrierDamageDoneAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.objectiveKillsAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.healingDoneAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.objectiveTimeAvgPer10Min,
                        selectedHeroData.assists && selectedHeroData.assists.offensiveAssistsAvgPer10Min,
                        selectedHeroData.assists && selectedHeroData.assists.defensiveAssistsAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.timeSpentOnFireAvgPer10Min,
                        selectedHeroData.average && selectedHeroData.average.deathsAvgPer10Min
                    ]}
                />

            </Masonry>
        </div>
    )
};

export default Profile;