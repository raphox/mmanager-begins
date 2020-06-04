import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import _ from "lodash";

import Room from "./Room";

const ROOMS = gql`
  {
    rooms {
      id
      number
      description
      state
    }
  }
`;

const ROOMS_SUBSCRIPTION = gql`
  subscription {
    roomUpdatedOrDelete {
      operation
      record {
        id
        number
        description
        state
      }
    }
  }
`;

const RoomsView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { data } = this.props;

    return (
      <div className="columns is-multiline">
        {data.rooms.map((room) => (
          <div
            key={room.id}
            className="column is-full-mobile is-one-third-tablet is-one-quarter-widescreen"
          >
            <Room {...room} />
          </div>
        ))}
      </div>
    );
  }
};

function Rooms() {
  const { loading, error, data, subscribeToMore } = useQuery(ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const more = () =>
    subscribeToMore({
      document: ROOMS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        let newRooms = prev.rooms || [];
        const { operation, record } = subscriptionData.data.roomUpdatedOrDelete;

        switch (operation) {
          case "INSERT":
          case "UPDATE":
            newRooms = _.unionBy(prev.rooms, [record], "id");
            break;

          case "DELETE":
            newRooms = _.reject(prev.rooms, { id: record.id });
            break;

          default:
            break;
        }

        return Object.assign({}, prev, {
          rooms: newRooms,
        });
      },
    });

  return <RoomsView data={data} subscribeToMore={more} />;
}

export default Rooms;
