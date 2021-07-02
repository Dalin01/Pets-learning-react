import { Component } from "react"; // class components
import { withRouter } from 'react-router-dom';
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

class Details extends Component {

  constructor () {
    super();
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount () {    
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`);
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal }); // toggle state
  adopt = () => (window.location = "http://bit.ly/pet-adopt"); // sends to website for adoption

  render() {
    if (this.state.loading) return <h2>Loading...</h2>
    const { animal, breed, city, state, desciption, name, images, showModal } = this.state;
    return (
      <div className='details'>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{desciption}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
        </div>

      </div>
    );
  }
  
}

const DetailsWithRouterError = withRouter(Details); // result is sent to boundary as props

export default function DetailsWithRouterBoundary (props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouterError {...props} />
    </ErrorBoundary>
  );
}

// withRouter returns the history Object's properties.
// the class props -> this.props can be accessed here. 
// export default withRouter(Details);