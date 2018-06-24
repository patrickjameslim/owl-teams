import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Columns, Column } from 'bloomer';
import { Card, CardImage, Image, Media, MediaContent, CardContent, Title, Subtitle } from 'bloomer';

import './Reset.css';
import './App.css';

class App extends Component {

  state = {
    teams: [],
    chosenTeam: [],
    teamColumns: []
  }

  getChosenTeam = (teams) => {
    const chosenTeam = teams.filter(team => team.name === "Seoul Dynasty");
    this.setState({chosenTeam: chosenTeam});

    const R = require('ramda');

    const teamColumns = R.splitEvery(4, this.state.chosenTeam[0].players);
    this.setState({teamColumns: teamColumns});
  }

  componentDidMount() {
    fetch('https://api.pandascore.co/ow/teams?range[id]=1544,1555&token=qTy3iY1LrWDkv6j53K_nOe-K35kECDxOqsaXQ59kRNNPZO9ToJc')
    .then(results => {
      return results.json();
    })
    .then(data => {
      this.setState({teams: data});
      this.getChosenTeam(data);
    });
  }

  showPlayers = () => {
    this.state.teamColumns.map(column => {
      return (
        <Columns>
          { column.map(player=> {
            return (
              <Column key={player.id} isSize='1/4'>
                <Card>
                  <CardImage>
                      <Image isRatio='square' src={player.image_url} alt={player.name}/>
                  </CardImage>
                  <CardContent>
                      <Media>
                          <MediaContent>
                              <Title isSize={4}>{player.name}</Title>
                              <Subtitle isSize={6}>{player.first_name} {player.last_name}</Subtitle>
                          </MediaContent>
                      </Media>
                  </CardContent>
                </Card>
              </Column>
            )
          })}
        </Columns>
      )
    });
  }

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1>Overwatch League Teams</h1>
        </header>
        <main className="overwatch-league">
            <div className="left-content">
            <Scrollbars>
              <div className="owl-teams">
                {this.state.teams.map(team => {
                  return(
                    <div key={team.id} className="list-item">
                      <div className="avatar">
                        <img src={team.image_url} alt={team.name}/>
                      </div>
                      <div className="information">
                        <h1>{team.name}</h1>
                      </div>
                    </div>
                  )
                })}
              </div>
              </Scrollbars>
            </div>
          <div className="right-content">
            <Container>
                <div className="team-information">
                  {this.state.chosenTeam.map(team => {
                    return (
                      <div key={team.id} className="team-name">
                        <h1 className="title">{team.name} <span className="acronym">({team.acronym})</span></h1>
                      </div>
                    )
                  })}
                  <div className="subheading --orange">
                    <h3>Team Roster</h3>
                  </div>
                  <div className="player-list">
                    {this.state.teamColumns.map((column, index) => {
                      return (
                        <Columns key={index}>
                          {column.map(player => {
                            return (
                              <Column key={player.id} isSize="1/4">
                                <Card>
                                  <CardImage>
                                      <Image isRatio='square' src={player.image_url} />
                                  </CardImage>
                                  <CardContent>
                                      <Media>
                                          <MediaContent>
                                              <Title isSize={4}>{player.name}</Title>
                                              <Subtitle isSize={6}>{player.first_name} {player.last_name}</Subtitle>
                                          </MediaContent>
                                      </Media>
                                  </CardContent>
                                </Card>
                              </Column>
                            )
                          })}
                        </Columns>
                      )
                    })};
                  </div>
                </div>  
            </Container>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
