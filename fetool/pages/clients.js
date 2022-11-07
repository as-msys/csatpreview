import { Box } from "@mui/system";
import { parseCookies } from "nookies";
import axios from "axios";

const Client = ({ clients }) => {
  return (
    <>
      <Box variant="container">
        Client Collections
        <hr />
        {clients.data.map((user) => (
          <div key={user.id}>
            <h3>Name of the Client- {user.attributes.name}</h3>
            <div>
              <h3>
                {" "}
                Name of the delivery Head:{" "}
                {user.attributes.delivery_head.data.attributes.name}
              </h3>
              {user.attributes.projects.data.map((project) => {
                return (
                  <div key={project.id}>
                    <h3>ProjectName:{project.attributes.name}</h3>
                    <h3>sow_start_date:{project.attributes.sow_start_date}</h3>
                  </div>
                );
              })}
              {user.attributes.point_of_contacts.map((person) => {
                return (
                  <div key={person.id}>
                    <h3>POC:{person.name}</h3>
                  </div>
                );
              })}
            </div>
            <hr />
          </div>
        ))}
      </Box>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt;

  const res = await axios.get(
    `http://localhost:1337/api/clients?fields=name&populate=delivery_head%2Cpoint_of_contacts%2Cprojects`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const clients = await res.data;

  return {
    props: {
      clients: clients,
    },
  };
}

export default Client;
