import React from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Stack,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  Tabs,
  FormField,
  TextInput,
  Button,
  Form,
  Select,
  TextArea,
  Layer,
} from 'grommet';
import Avatar from 'granite-admin/core/components/Avatar';
import { Edit } from 'grommet-icons';
import { colors } from 'grommet/themes/base';
import Api from '../../anuj/index';
import { useState } from 'react';
import { useEffect } from 'react';

function Anuj() {
  const [value, setValue] = React.useState({});
  const [show, setShow] = useState('');
  const [advice, setAdvice] = useState([]);
  const url = 'https://api.publicapis.org/entries';
  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const json = await response.json();
      const splic = json.entries.slice(55, 72);
      console.log(json);
      setAdvice(splic);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box overflow="hidden">
      <Grid
        rows={['large', 'large']}
        columns={['1/3', '2/3']}
        gap="small"
        overflow="hidden"
        areas={[
          { name: 'nav', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box direction="column" gap="xsmall" background="light-2" pad="medium" border="">
          <Box background="light-4" pad="medium">
            <Box
              margin={{
                left: 'xxlarge',
                right: 'xxlarge',
              }}
            >
              <Stack anchor="bottom-right">
                <Avatar
                  round="full"
                  size="14rem"
                  src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
                  alignSelf="centre"
                ></Avatar>
                <Box background="white" round="full" pad="medium" border={{ size: '2px', color: 'purple' }}>
                  <Edit color="brand" margin={{ top: 'medium', bottom: 'xsmall' }} anchor="top-right" />
                </Box>
              </Stack>
            </Box>
            <Text alignSelf="center" margin={{ top: 'medium', bottom: 'xsmall' }} size="27px" color="#222D39">
              Anuj Tanwar
            </Text>
            <Text color="#AFAFAF" alignSelf="center" size="17px">
              8287281540
            </Text>
            <Text color="#222D39F" alignSelf="center" size="15px">
              Gurgaon, Haryana
            </Text>
            <Box
              height="1px"
              margin={{
                top: 'medium',
              }}
              width="95%"
              background="purple"
            ></Box>
            <Box pad="medium">
              <Table>
                <TableBody>
                  <TableRow pad="medium">
                    <TableCell scope="row">
                      <strong>Employee Name</strong>
                    </TableCell>
                    <TableCell>Anuj Tanwar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row">
                      <strong>Employee Salary</strong>
                    </TableCell>
                    <TableCell>480000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="row">
                      <strong>Employee Age</strong>
                    </TableCell>
                    <TableCell>21</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
        <Box direction="column" gap="xsmall" pad="medium" background="light-2">
          <Tabs>
            <Box>
              <Tab title="User's List">
                <Box pad="medium">
                  <Api advice={advice} />
                </Box>
              </Tab>
            </Box>
            <Tab title="Admin Setting">
              <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={({ value }) => {
                  alert('Hello');
                }}
              >
                <Box width direction="row" gap="large" alignSelf="centre" margin={{ top: '2rem', left: '45rem' }}>
                  {' '}
                  <Box align="end" pad="medium">
                    <Button
                      primary
                      label="View Registration"
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                    {show && (
                      <Layer onEsc={() => setShow(false)} onClickOutside={() => setShow(false)}>
                        <Box pad="20px">
                          <FormField name="phone" htmlFor="Phone" label="Registered Phone Number">
                            <TextInput value="8287281540" id="rPhone" disabled />
                          </FormField>
                          <FormField name="email" htmlFor="rEmail" label="Registered Email">
                            <TextInput value="user@admin.com" id="rEmail" disabled />
                          </FormField>
                          <Button label="close" onClick={() => setShow(false)} />
                        </Box>
                      </Layer>
                    )}
                  </Box>
                </Box>
                <Box direction="row" gap="large" pad="medium" margin={{ left: '2rem' }}>
                  <FormField name="userDescription" htmlFor="select" label="User Timezone">
                    <Select
                      options={['UTC', 'Asia/Kolkata', 'Australia/Sydney']}
                      name="select"
                      id="select"
                      required
                      // value={value}
                      // onChange={({ option }) => setValue(option)}
                    />
                  </FormField>
                </Box>
                <Box width="50%" margin={{ left: '2rem' }}>
                  <FormField name="userDescription" htmlFor="description" label="User Description">
                    <TextArea placeholder="type here" name="message" id="description" maxlength="5" />
                  </FormField>
                </Box>
                <Box width="50%" margin={{ left: '2rem' }}>
                  <FormField name="name" htmlFor="email" label="Admin Email">
                    <TextInput id="email" name="email" type="email" placeholder="user@admin.com" required />
                  </FormField>
                </Box>

                <Box direction="row" gap="large" alignSelf="centre" margin={{ top: '2rem', left: '24rem' }}>
                  <Button type="submit" primary label="Submit" />
                </Box>
              </Form>
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  );
}

export default Anuj;
