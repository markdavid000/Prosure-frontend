import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavbarStyles } from '../components/Navbar';
import { Button } from '@chakra-ui/react';

export const ConnectProsure = () => {
  const { ctaFont } = useNavbarStyles();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    bgGradient="linear(to-r, #765fff, #b796ff)"
                    borderRadius="3xl"
                    {...ctaFont}
                    _hover={{
                      bg: 'linear-gradient(0deg, rgba(103, 80, 164, 0.14), rgba(103, 80, 164, 0.14)), #FFFBFE',
                      color: 'black',
                    }}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    bg="linear-gradient(0deg, rgba(103, 80, 164, 0.14), rgba(103, 80, 164, 0.14)), #FFFBFE"
                    borderRadius="3xl"
                    color="black"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    bg: 'white',
                    boxShadow: '-2px 5px 12px rgba(100, 100, 100, 0.1)',
                    borderRadius: '30px',
                    p: '6px 14px',
                    h: '48px',
                  }}
                >
                  <Button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    borderRadius="15px"
                    bg="white"
                    // _hover={{ bg: 'none', color: '#fff' }}
                    type="button"
                    fontSize="11px"
                    fontWeight="400"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 15,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    type="button"
                    bg="#F8E8FF"
                    borderRadius="15px"
                    color="#645C5E"
                    fontSize="12px"
                    fontWeight="600"
                    mr="10px"
                    mt="1px"
                    p="6px 10px"
                    h="36px"
                    _hover={{ bg: '#F8E8FF' }}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
