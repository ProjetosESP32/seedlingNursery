import PropTypes from 'prop-types';

import * as Styled from './styles';
import { Container } from '../Container';
import { ContentNavigation } from '../ContentNavigation';
import { PlantStageCheckbox } from '../PlantStageCheckbox';

export const PlantsByShelf = ({
  datas,
  handleFirst,
  handleBack,
  handleNext,
  handleLast,
  page = 0
}) => {
  return (
    <Container>
      <Styled.compStyle>
        <Styled.idNumber>ID</Styled.idNumber>
        <Styled.stage>matriz</Styled.stage>
        <Styled.plantingDate>data de plantio</Styled.plantingDate>
        <Styled.wrapper>
          <Styled.location>espécie</Styled.location>
          <ContentNavigation
            handleFirst={handleFirst}
            handleBack={handleBack}
            handleNext={handleNext}
            handleLast={handleLast}
            page={page}
          />
        </Styled.wrapper>
        {datas.map((row) => (
          <Styled.row key={row.id}>
            <Styled.idCell>{row.id}</Styled.idCell>
            <Styled.stageCell>{row.matrix}</Styled.stageCell>
            <Styled.dateCell>{row.date}</Styled.dateCell>
            <Styled.locationCell>{row.specie}</Styled.locationCell>
          </Styled.row>
        ))}
        <Styled.wrapper>
          <Styled.location></Styled.location>
          <ContentNavigation
            handleFirst={handleFirst}
            handleBack={handleBack}
            handleNext={handleNext}
            handleLast={handleLast}
            page={page}
          />
        </Styled.wrapper>
      </Styled.compStyle>
    </Container>
  );
};

PlantsByShelf.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFirst: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleLast: PropTypes.func.isRequired,
  page: PropTypes.number
};
