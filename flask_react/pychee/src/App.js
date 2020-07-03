import React from 'react';
import emo from './emo.png';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      req_msg: "",
      msgs: [],
      error: "",
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event) {
      this.setState({req_msg: event.target.value});
    }

    handleSubmit(event) {
      console.log('A msg was submitted: ' + this.state.req_msg);
      event.preventDefault();
      fetch("/api/msg?reqMsg=" + this.state.req_msg)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              msgs: result
            });
          },
          (error) => {
            this.setState({
              error: "Something wrong!!"
            });
          }
      )
    }

    componentDidMount() {

    }

    render() {
      const { error } = this.state;
      if (error) {
        return <div>Error: {error}</div>;
      } else {
        return (
          <div className="inbox_msg">
          <div className="mesgs">
            <div className="msg_history" id="msg_history_id">
        
              {this.state.msgs.map(msg => 
                <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src={emo} alt="sunil"/> </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{msg.req_msg}</p>
                        <span className="time_date">{Date.now()}</span>
                      </div>
                    </div>

                  <div className="outgoing_msg">
                    <div className="sent_msg">
                      <p>{msg.res_msg}</p>
                      <span className="time_date">{Date.now()}</span>
                    </div>
                  </div>
                </div>
                )
              }
            </div>

            <div className="type_msg">
              <div className="input_msg_write">
                <form onSubmit={this.handleSubmit}>
                  <input type="text" value={this.state.req_msg}  onChange={this.handleChange} className="write_msg" placeholder="Type a message" />
                  <button className="msg_send_btn" type="submit">
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
        );
      }
    }
}

export default MyComponent;
