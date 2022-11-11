import { Box } from "@mui/system";
import { parseCookies } from "nookies";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Client = ({ clients }) => {
  return (
    <>
      <Box variant="container">
        <h1>Client Collections</h1>

        {clients.data.map((user) => (
          <Card
            key={user.id}
            variant="outlined"
            style={{
              width: "50vw",
              marginTop: "1rem",
              backgroundColor: "#ADD8E6",
            }}
          >
            <CardContent>
              <div>
                <Typography>
                  <b>Name of the Client- </b>
                  {user.attributes.name}
                </Typography>

                <Typography>
                  {" "}
                  <b>Name of the delivery Head:</b>{" "}
                  {user.attributes.delivery_head.data.attributes.name}
                </Typography>
                {user.attributes.projects.data.map((project) => {
                  return (
                    <div key={project.id}>
                      <Typography>
                        <b>ProjectName:</b>
                        {project.attributes.name}
                      </Typography>
                      <Typography>
                        <b>sow_start_date:</b>
                        {project.attributes.sow_start_date}
                      </Typography>
                    </div>
                  );
                })}
                {user.attributes.point_of_contacts.map((person) => {
                  return (
                    <div key={person.id}>
                      <Typography>
                        <b>POC:</b>
                        {person.name}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
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
