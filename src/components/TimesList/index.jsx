import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

import * as Styled from './styles';
import { getIrrigationTime } from '../../api/dashBoardApi';
import { Container } from '../Container';

export const TimesList = ({ id, handleClick = (i) => console.log(i) }) => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    (async () => {
      setTimes(await getIrrigationTime(id));
    })();
  }, [id]);

  return (
    <Container
      style={{
        minHeight: '50rem',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between'
      }}>
      <Styled.compStyle>
        <Styled.id>ID</Styled.id>
        <Styled.initial>h. inicial</Styled.initial>
        <Styled.final>h. final</Styled.final>
        {times.length ? (
          times.map((row) => (
            <Styled.row key={row.id} onClick={() => handleClick(row.id)}>
              <Styled.idCell>{row.id}</Styled.idCell>
              <Styled.initialCell>{row.initialTime}</Styled.initialCell>
              <Styled.finalCell>{row.finalTime}</Styled.finalCell>
            </Styled.row>
          ))
        ) : (
          <h2 style={{ gridColumn: '1/-1' }}>nenhum horário cadastrado</h2>
        )}
      </Styled.compStyle>
    </Container>
  );
};

TimesList.propTypes = {
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func
};