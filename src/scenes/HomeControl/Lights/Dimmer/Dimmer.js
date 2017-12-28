import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import styled from 'styled-components'
import InputRange from 'ui/InputRange'
import Row from 'ui/Row'

export default class Dimmer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bri: PropTypes.number.isRequired,
    updateLight: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      value: this.props.bri
    }

    this.updateLight = debounce(this.updateLight.bind(this), 500)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.bri) {
      this.setState({
        value: nextProps.bri
      })
    }
  }

  onChange = value => {
    this.setState({ value }, () => this.updateLight())
  }

  updateLight () {
    this.props.updateLight({
      variables: { lightId: this.props.id, bri: Math.round(this.state.value) }
    })
  }

  render () {
    return (
      <Row align='center'>
        <div flex>
          <Name>{this.props.name}</Name>
          <InputRange value={this.state.value} onChange={this.onChange} />
        </div>
      </Row>
    )
  }
}

const Name = styled.div`
  margin-bottom: 8px;
`
