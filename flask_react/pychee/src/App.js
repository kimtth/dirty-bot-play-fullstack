import React from 'react';
//import logo from './logo.svg';

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
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
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
                    <div className="incoming_msg_img"> <img src="data:image/png;base64,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" alt="sunil"/> </div>
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
