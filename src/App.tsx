import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import "./App.css";

interface State {
  repos: object[];
  lastPostName?: string | undefined;
}

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { repos: [] };
  }

  fetchFirst = (url: string) => {
    if (url) {
      fetch(`https://api.github.com/users/${url}/repos`)
        .then(response => response.json())
        .then(result => {
          this.setState({
            repos: result,
            lastPostName: result[result.length - 1].name
          });
          console.log(this.state.repos);
        });
    }
  };

  fetchNext = (url: string, lastPostName: any) => {
    if (url) {
      fetch(``)
        .then(response => response.json())
        .then(result => {
          this.setState({
            repos: result,
            lastPostName: result[result.length - 1].name
          });
          console.log(this.state.repos);
        });
    }
  };

  componentDidMount() {
    this.fetchFirst("itzsaga");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>React PWA</span>}
            iconElementLeft={
              <IconButton>
                <NavigationClose />
              </IconButton>
            }
            iconElementRight={
              <FlatButton
                onClick={() =>
                  this.fetchNext("reactjs", this.state.lastPostName)
                }
                label="next"
              />
            }
          />
          {this.state.repos.map((el: any, index: number) => (
            <Card key={index}>
              <CardHeader
                title={el.name}
                subtitle={el.owner.login}
                actAsExpander={el.fork === true}
                showExpandableButton={false}
              />
              <CardText expandable={el.fork === true}>{el.language}</CardText>
              <CardActions>
                <FlatButton
                  label="View"
                  onClick={() => {
                    window.open(el.html_url);
                  }}
                />
              </CardActions>
            </Card>
          ))}
          <FlatButton
            onClick={() => this.fetchNext("reactjs", this.state.lastPostName)}
            label="next"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
