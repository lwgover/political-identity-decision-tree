import React, { useState } from 'react';
import SelectSearch from 'react-select-search';
import * as d3 from 'd3'

var setDVfn = (a) => console.log("running init setDV");
var setIVfn = (a) => console.log("running init setIV");
var setColorschemefn = (a) => console.log("running init setColorscheme");
var IVvar = { "variables": [] };

const options = [
  {
    "name": "Biological sex",
    "value": "DP1"
  },
  {
    "name": "Age",
    "value": "DP2"
  },
  {
    "name": "Ethnicity",
    "value": "DP3"
  },
  {
    "name": "Income",
    "value": "DP4"
  },
  {
    "name": "Education",
    "value": "DP5"
  },
  {
    "name": "Marital Status",
    "value": "DP6"
  },
  {
    "name": "Employment Status",
    "value": "DP7"
  },
  {
    "name": "Children",
    "value": "DP8"
  },
  {
    "name": "Social status",
    "value": "DP9"
  },
  {
    "name": "Immigrant status",
    "value": "DP10"
  },
  {
    "name": "Religion",
    "value": "DP11"
  },
  {
    "name": "Vote: Local level",
    "value": "DP12"
  },
  {
    "name": "Vote: National level",
    "value": "DP13"
  },
  {
    "name": "Vote choice if election tomorrow",
    "value": "DP14"
  },
  {
    "name": "Membership: Church or religious organization",
    "value": "DP15"
  },
  {
    "name": "Membership: Political party",
    "value": "DP16"
  },
  {
    "name": "Membership: Environmental organization",
    "value": "DP17"
  },
  {
    "name": "Close to: The town or city where you live",
    "value": "DP18"
  },
  {
    "name": "Close to: Your country",
    "value": "DP19"
  },
  {
    "name": "Close to: The world",
    "value": "DP20"
  },
  {
    "name": "Interest in politics",
    "value": "DP21"
  },
  {
    "name": "General trust",
    "value": "DP22"
  },
  {
    "name": "Freedom vs. equality",
    "value": "DP23"
  },
  {
    "name": "Freedom vs. security",
    "value": "DP24"
  },
  {
    "name": "Fight for country?",
    "value": "DP25"
  },
  {
    "name": "Immigration: Fills important job vacancies",
    "value": "DP26"
  },
  {
    "name": "Immigration: Strengthens cultural diversity",
    "value": "DP27"
  },
  {
    "name": "Immigration: Increases the crime rate",
    "value": "DP28"
  },
  {
    "name": "Immigration: Gives asylum to political refugees who are persecuted elsewhere",
    "value": "DP29"
  },
  {
    "name": "Immigration: Increases the risks of terrorism",
    "value": "DP30"
  },
  {
    "name": "Immigration: Increases unemployment",
    "value": "DP31"
  },
  {
    "name": "Immigration: Leads to social conflict",
    "value": "DP32"
  },
  {
    "name": "Important in life: Family",
    "value": "DP33"
  },
  {
    "name": "Important in life: Work",
    "value": "DP34"
  },
  {
    "name": "Important in life: Politics",
    "value": "DP35"
  },
  {
    "name": "Important in life: Religion",
    "value": "DP36"
  },
  {
    "name": "Trust: People you meet for the first time",
    "value": "DP37"
  },
  {
    "name": "Trust: People of another religion",
    "value": "DP38"
  },
  {
    "name": "Trust: People of another nationality",
    "value": "DP39"
  },
  {
    "name": "Confidence: The press",
    "value": "DP40"
  },
  {
    "name": "Confidence: The police",
    "value": "DP41"
  },
  {
    "name": "Confience: The courts",
    "value": "DP42"
  },
  {
    "name": "Confidence: The government of the United States in Washington DC",
    "value": "DP43"
  },
  {
    "name": "Confidence: Political parties",
    "value": "DP44"
  },
  {
    "name": "Confidence: US Congress",
    "value": "DP45"
  },
  {
    "name": "Confidence: Universities",
    "value": "DP46"
  },
  {
    "name": "Confidence: Elections",
    "value": "DP47"
  },
  {
    "name": "Confidence: Banks",
    "value": "DP48"
  },
  {
    "name": "Confidence: Women's organizations",
    "value": "DP49"
  },
  {
    "name": "Having a strong leader who does not have to bother with parliament and elections",
    "value": "DP50"
  },
  {
    "name": "Having experts, not government, make decisions according to what they think is best for the country",
    "value": "DP51"
  },
  {
    "name": "Having the army rule",
    "value": "DP52"
  },
  {
    "name": "Having a democratic political system",
    "value": "DP53"
  },
  {
    "name": "Views on income inequality",
    "value": "DP54"
  },
  {
    "name": "Views on responsibility",
    "value": "DP55"
  },
  {
    "name": "Views on corruption",
    "value": "DP56"
  },
  {
    "name": "Justifiable: Claiming government benefits to which you are not entitled",
    "value": "DP57"
  },
  {
    "name": "Justifiable: Avoiding a fare on public transport",
    "value": "DP58"
  },
  {
    "name": "Justifiable: Cheating on taxes if you have the chance",
    "value": "DP59"
  },
  {
    "name": "Justifiable: Someone accepting a bribe in the course of their duties",
    "value": "DP60"
  },
  {
    "name": "Justifiable: Abortion",
    "value": "DP61"
  },
  {
    "name": "Justifiable: Political violence",
    "value": "DP62"
  },
  {
    "name": "Justifiable: Death penalty",
    "value": "DP63"
  },
  {
    "name": "Essential characteristic of democracy: governments tax the rich and subsidize the poor",
    "value": "DP64"
  },
  {
    "name": "Essential characteristic of democracy: people receive state aid for unemployment",
    "value": "DP65"
  },
  {
    "name": "Essential characteristic of democracy: civil rights protect people from state oppression",
    "value": "DP66"
  },
  {
    "name": "Essential characteristic of democracy: the state makes people's incomes equal",
    "value": "DP67"
  },
  {
    "name": "Essential characteristic of democracy: people obey their rulers",
    "value": "DP68"
  },
  {
    "name": "Essential characteristic of democracy: women have the same rights as men",
    "value": "DP69"
  },
  {
    "name": "Left vs right",
    "value": "DP70"
  },
  {
    "name": "Democratic satisfaction",
    "value": "DP71"
  },
  {
    "name": "How important is God in life",
    "value": "DP72"
  }
];

const colorSchemeOptions = [
  {
    'name': 'red-to-blue','value': 'red-to-blue'
  },
  {
    'name': 'blue-to-red','value': 'blue-to-red'
  },
  {
    'name': 'categorical','value': 'categorical'
  },
  {
    'name': 'black','value': 'black'
  },
  {
    'name': 'default','value': 'default'
  },

]
let optionsDict = Object.assign({}, ...options.map((x) => ({ [x.value]: x.name })));

const handleChangeColorScheme = event => {
  setColorschemefn({ "variables": [{ "name": event, "value": event }] });
};

function renderColorSchemeOption(props, option, snapshot, className) {
  return (
    <button {...props} className={className} type="button">
      <span>{option.name}</span>
    </button>
  );
}


export const ColorschemeSelectSearch = ({ setColorSchemefn }) => {

  setColorschemefn = setColorSchemefn;

  return <div className="custom-select-search-container">
    <SelectSearch
      className="select-search"
      options={colorSchemeOptions}
      renderOption={renderColorSchemeOption}
      search
      placeholder={"Color Scheme"}
      onChange={handleChangeColorScheme}
    />
  </div>
};

const handleChangeDV = event => {
  setDVfn({ "variables": [{ "name": optionsDict[event], "value": event }] });
};

function renderDVOption(props, option, snapshot, className) {
  return (
    <button {...props} className={className} type="button">
      <span>
        <span>{option.name}</span>
      </span>
    </button>
  );
}


export const DVSelectSearch = ({ setDV }) => {

  setDVfn = setDV;

  return <div className="custom-select-search-container">
    <SelectSearch
      className="select-search"
      options={options}
      renderOption={renderDVOption}
      search
      placeholder={"Dependent Variable"}
      onChange={handleChangeDV}
    />
  </div>
};

const handleChangeIV = event => {
  if (!(IVvar.variables.map((a) => a.value).includes(event))) {
    setIVfn({ "variables": [...IVvar.variables, { "name": optionsDict[event], "value": event }] });
  }
};
function renderIVOption(props, option, snapshot, className) {
  return (
    <button {...props} className={className} type="button">
      <span>
        <span>{option.name}</span>
      </span>
    </button>
  );
}


export const IVSelectSearch = ({ IV, setIV }) => {

  setIVfn = setIV;
  IVvar = IV;

  return <div className="custom-select-search-container">
    <SelectSearch
      className="select-search"
      options={options}
      renderOption={renderIVOption}
      search
      placeholder={"Dependent Variable"}
      onChange={handleChangeIV}
    />
  </div>
};

function renderOption(props, option, snapshot, className) {
  const doOnClick = () => {
    console.log(option)
  }
  return (
    <button {...props} className={className} type="button" onClick={doOnClick}>
      <span>
        <span>{option.name}</span>
      </span>
    </button>
  );
}


const VariableSelectSearch = ({ default_value }) => {

  return <div className="custom-select-search-container">
    <SelectSearch
      className="select-search"
      options={options}
      renderOption={renderOption}
      search
      placeholder={default_value}
    />
  </div>
};
export default VariableSelectSearch;