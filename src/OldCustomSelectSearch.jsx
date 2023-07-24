import SelectSearch from 'react-select-search';


const options = [{name: "Age", value: "DP2"},{name: "Biological sex", value: "DP1"},{name: "Children", value: "DP8"},{name: "Close to: The town or city where you live", value: "DP18"},{name: "Close to: The world", value: "DP20"},{name: "Close to: Your country", value: "DP19"},{name: "Confidence: Banks", value: "DP48"},{name: "Confidence: Elections", value: "DP47"},{name: "Confidence: Political parties", value: "DP44"},{name: "Confidence: The government of the United States in Washington DC", value: "DP43"},{name: "Confidence: The police", value: "DP41"},{name: "Confidence: The press", value: "DP40"},{name: "Confidence: US Congress", value: "DP45"},{name: "Confidence: Universities", value: "DP46"},{name: "Confidence: Women's organizations", value: "DP49"},{name: "Confience: The courts", value: "DP42"},{name: "Democratic satisfaction", value: "DP71"},{name: "Education", value: "DP5"},{name: "Employment Status", value: "DP7"},{name: "Essential characteristic of democracy: civil rights protect people from state oppression", value: "DP66"},{name: "Essential characteristic of democracy: governments tax the rich and subsidize the poor", value: "DP64"},{name: "Essential characteristic of democracy: people obey their rulers", value: "DP68"},{name: "Essential characteristic of democracy: people receive state aid for unemployment", value: "DP65"},{name: "Essential characteristic of democracy: the state makes people's incomes equal", value: "DP67"},{name: "Essential characteristic of democracy: women have the same rights as men", value: "DP69"},{name: "Ethnicity", value: "DP3"},{name: "Fight for country?", value: "DP25"},{name: "Freedom vs. equality", value: "DP23"},{name: "Freedom vs. security", value: "DP24"},{name: "General trust", value: "DP22"},{name: "Having a democratic political system", value: "DP53"},{name: "Having a strong leader who does not have to bother with parliament and elections", value: "DP50"},{name: "Having experts},{name: not government},{name: make decisions according to what they think is best for the country", value: "DP51"},{name: "Having the army rule", value: "DP52"},{name: "How important is God in life", value: "DP72"},{name: "Immigrant status", value: "DP10"},{name: "Immigration: Fills important job vacancies", value: "DP26"},{name: "Immigration: Gives asylum to political refugees who are persecuted elsewhere", value: "DP29"},{name: "Immigration: Increases the crime rate", value: "DP28"},{name: "Immigration: Increases the risks of terrorism", value: "DP30"},{name: "Immigration: Increases unemployment", value: "DP31"},{name: "Immigration: Leads to social conflict", value: "DP32"},{name: "Immigration: Strengthens cultural diversity", value: "DP27"},{name: "Important in life: Family", value: "DP33"},{name: "Important in life: Politics", value: "DP35"},{name: "Important in life: Religion", value: "DP36"},{name: "Important in life: Work", value: "DP34"},{name: "Income", value: "DP4"},{name: "Interest in politics", value: "DP21"},{name: "Justifiable: Abortion", value: "DP61"},{name: "Justifiable: Avoiding a fare on public transport", value: "DP58"},{name: "Justifiable: Cheating on taxes if you have the chance", value: "DP59"},{name: "Justifiable: Claiming government benefits to which you are not entitled", value: "DP57"},{name: "Justifiable: Death penalty", value: "DP63"},{name: "Justifiable: Political violence", value: "DP62"},{name: "Justifiable: Someone accepting a bribe in the course of their duties", value: "DP60"},{name: "Left vs right", value: "DP70"},{name: "Marital Status", value: "DP6"},{name: "Membership: Church or religious organization", value: "DP15"},{name: "Membership: Environmental organization", value: "DP17"},{name: "Membership: Political party", value: "DP16"},{name: "Religion", value: "DP11"},{name: "Social status", value: "DP9"},{name: "Trust: People of another nationality", value: "DP39"},{name: "Trust: People of another religion", value: "DP38"},{name: "Trust: People you meet for the first time", value: "DP37"},{name: "Views on corruption", value: "DP56"},{name: "Views on income inequality", value: "DP54"},{name: "Views on responsibility", value: "DP55"},{name: "Vote choice if election tomorrow", value: "DP14"},{name: "Vote: Local level", value: "DP12"},{name: "Vote: National level", value: "DP13"}];

// https://randomuser.me/
const friends = [
    {
        name: 'Annie Cruz',
        value: 'annie.cruz',
        photo: 'https://randomuser.me/api/portraits/women/60.jpg',
    },
    {
        name: 'Eli Shelton',
        disabled: true,
        value: 'eli.shelton',
        photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
        name: 'Loretta Rogers',
        value: 'loretta.rogers',
        photo: 'https://randomuser.me/api/portraits/women/51.jpg',
    },
    {
        name: 'Lloyd Fisher',
        value: 'lloyd.fisher',
        photo: 'https://randomuser.me/api/portraits/men/34.jpg',
    },
    {
        name: 'Tiffany Gonzales',
        value: 'tiffany.gonzales',
        photo: 'https://randomuser.me/api/portraits/women/71.jpg',
    },
    {
        name: 'Charles Hardy',
        value: 'charles.hardy',
        photo: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
        name: 'Rudolf Wilson',
        value: 'rudolf.wilson',
        photo: 'https://randomuser.me/api/portraits/men/40.jpg',
    },
    {
        name: 'Emerald Hensley',
        value: 'emerald.hensley',
        photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        name: 'Lorena McCoy',
        value: 'lorena.mccoy',
        photo: 'https://randomuser.me/api/portraits/women/70.jpg',
    },
    {
        name: 'Alicia Lamb',
        value: 'alicia.lamb',
        photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    {
        name: 'Maria Waters',
        value: 'maria.waters',
        photo: 'https://randomuser.me/api/portraits/women/82.jpg',
    },
];

function renderOption(props,option,snapshot,className) {
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

function renderFriend(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (
        <button {...props} className={className} type="button">
            <span>
                <img
                    alt=""
                    style={imgStyle}
                    width="28"
                    height="28"
                    src={option.photo}
                />
                <span>{option.name}</span>
            </span>
        </button>
    );
}

export const AvatarExample = () => (

    <SelectSearch
        className="select-search"
        options={options}
        renderOption={renderOption}
        multiple
        search
        placeholder="Search friends"
    />
);