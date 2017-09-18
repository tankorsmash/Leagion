import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fuse from 'fuse.js';

import { Input } from 'reactstrap';

function defaultResultsTemplate(props, state, styl, clickHandler) {
  return state.results.map((val, i) => {
    return (
      <div key={i} onClick={() => clickHandler(i)}>
        {val.title}
      </div>
    );
  });
}

export default class FuzzySearch extends React.Component {
  static propTypes = {
    caseSensitive: PropTypes.bool,
    className: PropTypes.string,
    distance: PropTypes.number,
    id: PropTypes.string,
    include: PropTypes.array,
    maxPatternLength: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    keys: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    list: PropTypes.array.isRequired,
    location: PropTypes.number,
    placeholder: PropTypes.string,
    resultsTemplate: PropTypes.func,
    shouldSort: PropTypes.bool,
    sortFn: PropTypes.func,
    threshold: PropTypes.number,
    tokenize: PropTypes.bool,
    verbose: PropTypes.bool,
    autoFocus: PropTypes.bool,
    maxResults: PropTypes.number,
  };

  static defaultProps = {
    caseSensitive: false,
    distance: 100,
    include: [],
    location: 0,
    width: 430,
    placeholder: 'Search',
    resultsTemplate: defaultResultsTemplate,
    shouldSort: true,
    sortFn(a, b) {
      return a.score - b.score;
    },
    threshold: 0.6,
    tokenize: false,
    verbose: false,
    autoFocus: false,
    maxResults: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selectedIndex: 0,
      selectedValue: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.fuse = new Fuse(props.list, this.getOptions());
  }

  getOptions() {
    const {
      caseSensitive,
      id,
      include,
      keys,
      shouldSort,
      sortFn,
      tokenize,
      verbose,
      maxPatternLength,
      distance,
      threshold,
      location,
    } = this.props;

    return {
      caseSensitive,
      id,
      include,
      keys,
      shouldSort,
      sortFn,
      tokenize,
      verbose,
      maxPatternLength,
      distance,
      threshold,
      location,
    };
  }

  getResultsTemplate() {
    return this.state.results.map((val, i) => {
        return <div key={i} >{val.title} Selected: { this.state.selectedIndex === i}</div>;
    });
  }

  handleChange(e) {
    this.setState({
      results: this.fuse.search(e.target.value).slice(0, this.props.maxResults - 1),
    });
  }

  handleKeyDown(e) {
    const { results, selectedIndex } = this.state;
    if (e.keyCode === 40 && selectedIndex < results.length - 1) {
      this.setState({
        selectedIndex: selectedIndex + 1,
      });
    } else if (e.keyCode === 38 && selectedIndex > 0) {
      this.setState({
        selectedIndex: selectedIndex - 1,
      });
    } else if (e.keyCode === 13) {
      if (results[selectedIndex]) {
        this.props.onSelect(results[this.state.selectedIndex]);
        this.setState({
          selectedValue: results[this.state.selectedIndex],
        });
      }
      this.setState({
        results: [],
        selectedIndex: 0,
      });
    }
  }

  handleMouseClick(clickedIndex) {
    const { results } = this.state;

    if (results[clickedIndex]) {
      this.props.onSelect(results[clickedIndex]);
    }
    this.setState({
      results: [],
      selectedIndex: 0,
    });
  }

  render() {
    const { className, width, resultsTemplate, placeholder, autoFocus } = this.props;

    const mainClass = classNames('react-fuzzy-search', className);

    return (
      <div className={mainClass} onKeyDown={this.handleKeyDown}>
        <div >
          <Input
            type="text"
            onChange={this.handleChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={this.state.selectedValue && this.state.selectedValue.title}
          />
        </div>
        {this.state.results &&
          this.state.results.length > 0 &&
          <div >
            {resultsTemplate(this.props, this.state, {}, this.handleMouseClick)}
          </div>}
      </div>
    );
  }
}
