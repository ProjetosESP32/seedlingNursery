import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRef } from 'react';

import * as Styled from './styles';
import { SubmitBtn } from '../SubmitBtn';
import { Container } from '../Container';
import { InputFText } from '../InputFText';
import { saveSpecie } from '../../api/speciesApi';
/* const handleClick = () => {
  console.log("Wow, I'm gonna load some plants!!");
}; */

export const SpeciesRegisterForm = () => {
  const [srcImg, setSrcImg] = useState('./img/mock/noPhoto.png');
  const imgInput = useRef();
  const nameInput = useRef();
  const scienInput = useRef();
  const descInput = useRef();

  const handleChange = () => {
    const image = imgInput.current.files[0];
    setSrcImg(URL.createObjectURL(image));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitSpecie = async () => {
    if (!nameInput.current.value || !scienInput.current.value || !descInput.current.value) {
      alert('Preencha todos os campos para cadastrar a espécie.');
      return;
    }

    const base64 = await convertBase64(imgInput.current.files[0]);
    const img = base64.split('base64,');
    //mounting the object
    const specieObject = {
      name: nameInput.current.value,
      scienName: scienInput.current.value,
      description: descInput.current.value,
      image: img[1]
    };

    //console.log(JSON.stringify(specieObject));

    const response = await saveSpecie(specieObject);
    window.location.reload(false);

    /* let data = new FormData();
    if (!nameInput.current.value || !scienInput.current.value || !descInput.current.value) {
      alert('Preencha todos os campos para cadastrar a espécie.');
      return;
    }
    data.append('image', imgInput.current.files[0]);
    data.append('name', nameInput.current.value);
    data.append('scientificName', scienInput.current.value);
    data.append('description', descInput.current.value);
    data.append('id', uuidv4());

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      }); */
  };

  return (
    <Container>
      <Styled.sectionStyle>
        <Styled.containerStyle>
          <div>
            <Styled.imageStyle src={srcImg} />
            <input
              type="file"
              onChange={handleChange}
              ref={imgInput}
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
          <Styled.contentContainer>
            <Styled.sepRectangle />
            <Styled.nameWrapper>
              <InputFText
                fieldW={46}
                type="text"
                placeholder="nome da espécie"
                className="specieTitle"
                forwardedRef={nameInput}
              />
            </Styled.nameWrapper>
            <Styled.scienNameWrapper>
              <InputFText
                fieldW={46}
                type="text"
                placeholder="nome científico"
                className="specieTitle"
                forwardedRef={scienInput}
              />
            </Styled.scienNameWrapper>
            <Styled.sepRectangle />
            <Styled.textAreaStyle
              rows="7"
              cols="48"
              placeholder="descrição da espécie"
              ref={descInput}
            />
          </Styled.contentContainer>
        </Styled.containerStyle>
        <SubmitBtn onClick={submitSpecie}>Cadastrar Espécie</SubmitBtn>
        <Styled.fullSeparator />
      </Styled.sectionStyle>
    </Container>
  );
};

SpeciesRegisterForm.propTypes = {
  srcImg: PropTypes.string,
  name: PropTypes.string,
  scientificName: PropTypes.string,
  description: PropTypes.string,
  handleSearch: PropTypes.func
};
