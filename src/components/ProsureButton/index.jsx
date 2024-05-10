import { FC, memo } from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';

const ProsureButton = ({
  icon,
  name,
  isLoading,
  onCLick,
  isDisabled,
  rest,
}) => {
  const { root } = useStyles();

  return (
    <>
      <Button
        disabled={isDisabled}
        as={'button'}
        isLoading={isLoading}
        onClick={onCLick}
        {...root}
        {...rest}
        loadingText="loading"
      >
        {icon}
        <Text fontSize={'70%'}>{name}</Text>
      </Button>
    </>
  );
};

export default memo(ProsureButton);

const useStyles = () => {
  return {
    root: {
      colorScheme: 'black',
      bg: 'black',
      py: {
        base: 5,
      },
      width: '100%',
      h: '40px',
      borderRadius: '100px',
      fontWeight: '400',
      loadingText: 'Submitting',
      fontSize: ['20px'],
      lineHeight: '20px',
      letterSpacing: '0.2px',
      borderColor: 'dark',
    },
  };
};
