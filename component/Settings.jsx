const { SliderInput } = require('powercord/components/settings');
const { React } = require('powercord/webpack');
module.exports = class Settings extends React.PureComponent {
  render (props) {
    return (
      <div>
        <SliderInput
            minValue={1}
            maxValue={100}
            value={this.props.getSetting('volume', 100)}
            onChange={(value) => {this.props.updateSetting('volume', value);
        document.getElementById('osutype').volume = value / 100;}}
        >
            Volume
        </SliderInput>
      </div>
    );
  }
};