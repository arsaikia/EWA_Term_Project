import React, {useState} from 'react';
import styled from 'styled-components';
import {Container, FlexContainer, Input} from '../StylingComponents';
import {Note} from '../Texts';
import {Colors} from '../Colors';
import {CircledX} from '../Icons';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const FormContainer = styled(Container)`
  border-bottom: ${(props) =>
      props.error ? '2px' : props.active ? '2px' : '1px'}
    solid
    ${(props) =>
      props.error
        ? Colors.red
        : props.active
        ? Colors.deepBlue
        : Colors.darkGrey};
  padding-bottom: 4px;

  @media (max-width: 768px) {
    padding-bottom: 4px;
  }
`;

const StyledInput = styled(Input)`
color: ${props=> props.color};
  border: solid 1px transparent;
  text-decoration: none;
  outline: none;
  width: 99%;
  padding: 0px;
  margin: 10px 0px 0px 0px;

  @media (max-width: 768px) {
    margin: 10px 0px 0px 0px;
  }
`;

const StyledCancel = styled.div`
  z-index: 2;
  margin-bottom: 4px;
  visibility: visible;
  margin-left: -28px;

  svg {
  }

  div {
    cursor: poroboto;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 6px;
    margin-left: -28px;
  }
`;

const FormInput = ({
  title,
  value,
  onChange,
  handleBlur = null,
  placeholder = '',
  error,
  errorMessage = '',
  showOnHover,
  required = false,
  cancellable,
  icon = null,
  handleKeyDown = null
}) => {
  const [active, setActive] = useState(false);

  const toggleHighlight = () => {
    setActive(!active);
  };

  const handleHover = (x) => {
    if (typeof showOnHover === 'function') {
      showOnHover(x);
    }
  };

  return (
    <>
      <FlexContainer width="100%" justifyContent="center" alignItems="flex-end">
        <FormContainer width="100%" error={error} active={active}>
          <FlexContainer>
            <Note
              text={
                <p>
                  {title}
                  {required ? <span className="blue"> *</span> : ''}
                </p>
              }
              color={
                error ? Colors.red : active ? Colors.lightOnDark : Colors.darkGrey
              }
            />
            {icon}
          </FlexContainer>
          <StyledInput
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            type="text"
            color={Colors.lightOnDark}
            placeholder={placeholder}
            onFocus={() => {
              handleHover(true);
              toggleHighlight();
            }}
            onBlur={() => {
              handleHover(true);
              toggleHighlight();
              handleBlur && handleBlur();
            }}
            onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
          />
        </FormContainer>
        {cancellable && (
          <StyledCancel>
            <Container onClick={() => onChange && onChange('')}>
              <CircledX
                color={active ? Colors.lightOnDark : Colors.darkGrey}
              />
            </Container>
          </StyledCancel>
        )}
      </FlexContainer>
      {error && errorMessage.length > 0 && (
        <Container marginTop="3px">
          <Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
        </Container>
      )}
    </>
  );
};

const FormPasswordInput = ({
  title,
  value,
  onChange,
  onClick,
  onBlurHandler = null,
  showOnHover,
  cancellable,
  error,
  handleKeyDown = null,
  handlePasswordError = () => () => {}
}) => {
  const [active, setActive] = useState(false);

  const toggleHighlight = () => {
    setActive(!active);
  };

  const handleHover = (x) => {
    if (typeof showOnHover === 'function') {
      showOnHover(x);
    }
  };

  return (
    <FlexContainer width="100%" justifyContent="center" alignItems="flex-end">
      <FormContainer width="100%" error={error} active={active}>
        <Note
          text={<p>{title}</p>}
          color={
            error ? Colors.red : active ? Colors.lightOnDark : Colors.darkGrey
          }
        />
        <StyledInput
          value={value}
          color={Colors.lightOnDark}
          onChange={(e) => onChange && onChange(e.target.value)}
          type="password"
          onFocus={() => {
            handlePasswordError(false)();
            handleHover(true);
            toggleHighlight();
          }}
          onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
          onBlur={() => {
            toggleHighlight();
            if (handlePasswordError(true)()) {
              return;
            }
            handleHover(false);
            onBlurHandler && onBlurHandler();
          }}
          onClick={onClick}
        />
      </FormContainer>
      {cancellable && (
        <StyledCancel>
          <Container onClick={() => onChange && onChange('')}>
            <CircledX color={active ? Colors.manifestBlue : Colors.darkGrey} />
          </Container>
        </StyledCancel>
      )}
    </FlexContainer>
  );
};

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted ' + Colors.lightGrey,
    color: state.isSelected ? Colors.deepBlue : '',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'left',
    cursor: 'poroboto'
  }),
  container: (base) => ({
    ...base,
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none'
  }),
  control: (base) => ({
    ...base,
    height: 32,
    minHeight: 32,
    fontSize: 16,
    borderRadius: 0,
    width: '100%',
    textAlign: 'left',
    cursor: 'poroboto',
    backgroundColor: 'transparent',
    border: 'none',
    margin: '10px 0px 0px 0px',
    hover: 'none',
    fontFamily: 'roboto',
    borderColor: Colors.lightGrey,
    boxShadow: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    fontFamily: 'roboto',
    color: state.selectProps.isActive ? Colors.deepBlue : Colors.darkGrey
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none'
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    paddingLeft: 2,
    fontFamily: 'roboto'
  }),
  menu: (base) => ({
    ...base,
    fontFamily: 'roboto',
    marginTop: '20px',
    zIndex: '3'
  })
};

const testOptions = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
];

const FormDropdown = ({
  options = testOptions,
  value = {value: '', label: ''},
  title,
  error = false,
  required = false,
  onChange = null,
  icon = null,
  errorMessage = '',
  creatable = false,
  isClearable = false
}) => {
  const [active, setActive] = useState(false);

  const toggleHighlight = () => {
    setActive(!active);
  };

  return (
    <>
      <FormContainer width="100%" error={error} active={active}>
        <FlexContainer>
          <Note
            text={
              <p>
                {title}
                {required ? <span className="blue"> *</span> : ''}
              </p>
            }
            color={
              error ? Colors.red : active ? Colors.deepBlue : Colors.darkGrey
            }
          />
          {icon}
        </FlexContainer>
        {creatable ? (
          <CreatableSelect
            styles={selectStyles}
            onFocus={toggleHighlight}
            onBlur={toggleHighlight}
            options={options}
            onChange={onChange}
            value={value}
            isClearable={isClearable}
            isActive={active}
          />
        ) : (
          <Select
            styles={selectStyles}
            onFocus={toggleHighlight}
            onBlur={toggleHighlight}
            options={options}
            onChange={onChange}
            value={value}
            isActive={active}
          />
        )}
      </FormContainer>
      {error && errorMessage.length > 0 && (
        <Container marginTop="3px">
          <Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
        </Container>
      )}
    </>
  );
};

const DateInput = ({
  title,
  value,
  onChange,
  placeholder = 'yyyy-MM-dd',
  error,
  errorMessage = '',
  showOnHover,
  required = false,
  cancellable,
  icon = null,
  handleKeyDown = null,
  onCancel,
  onBlurHandler = null
}) => {
  const [active, setActive] = useState(false);

  const toggleHighlight = () => {
    setActive(!active);
  };

  const handleHover = (x) => {
    if (typeof showOnHover === 'function') {
      showOnHover(x);
    }
  };

  return (
    <>
      <FlexContainer width="100%" justifyContent="center" alignItems="flex-end">
        <FormContainer width="100%" error={error} active={active}>
          <FlexContainer>
            <Note
              text={
                <p>
                  {title}
                  {required ? <span className="blue"> *</span> : ''}
                </p>
              }
              color={
                error ? Colors.red : active ? Colors.lightOnDark : Colors.darkGrey
              }
            />
            {icon}
          </FlexContainer>
          <StyledInput
            style={{fontSize: '16px', fontFamily: 'roboto'}}
            value={value}
            color={Colors.lightOnDark}
            onChange={(e) => onChange && onChange(e.target.value)}
            type="date"
            placeholder={placeholder}
            onFocus={() => {
              handleHover(true);
              toggleHighlight();
            }}
            onKeyDown={(e) => handleKeyDown && handleKeyDown(e.key)}
            onBlur={() => {
              handleHover(false);
              toggleHighlight();
              onBlurHandler && onBlurHandler();
            }}
          />
        </FormContainer>
        {cancellable && (
          <StyledCancel>
            <div onClick={onCancel}>
              <CircledX
                color={active ? Colors.lightOnDark : Colors.darkGrey}
              />
            </div>
          </StyledCancel>
        )}
      </FlexContainer>
      {error && errorMessage.length > 0 && (
        <Container marginTop="3px">
          <Note bold text={<p>{errorMessage}</p>} color={Colors.errorRed} />
        </Container>
      )}
    </>
  );
};

export {FormInput, FormPasswordInput, FormDropdown, DateInput};
