import React from "react";
import styled from "styled-components";

import sizes from "shared/lib/designSystem/sizes";
import theme from "shared/lib/designSystem/theme";
import useScreenSize from "shared/lib/hooks/useScreenSize";
import useVaultOption from "../../hooks/useVaultOption";
import AccountStatus from "webapp/lib/components/Wallet/AccountStatus";
import DesktopFooter from "webapp/lib/components/Footer/DesktopFooter";
import { useState } from "react";
import { FrameBar } from "../FrameBar/FrameBar";

const FooterContainer = styled.div<{
  screenHeight: number;
  showVaultPosition: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  // backdrop-filter: blur(40px);
  /**
   * Firefox desktop come with default flag to have backdrop-filter disabled
   * Firefox Android also currently has bug where backdrop-filter is not being applied
   * More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1178765
   **/
  @-moz-document url-prefix() {
    background-color: rgba(0, 0, 0, 0.9);
  }

  ${(props) => `
    position: sticky;
    top: calc(${props.screenHeight ? `${props.screenHeight}px` : `100%`} - ${theme.footer.desktop.height
    }px);
  `}

  @media (max-width: ${sizes.md}px) {
    position: fixed;
    top: unset;
    bottom: 0px;
    height: ${(props) =>
    props.showVaultPosition
      ? theme.footer.mobile.heightWithPosition
      : theme.footer.mobile.height}px;
    z-index: 5;
  }
`;

const MobileFooterOffsetContainer = styled.div<{ showVaultPosition: boolean }>`
  @media (max-width: ${sizes.md}px) {
    height: ${(props) =>
    props.showVaultPosition
      ? theme.footer.mobile.heightWithPosition
      : theme.footer.mobile.height}px;
  }
`;

const Footer = () => {
  const { height: screenHeight, width } = useScreenSize();
  const { vaultOption, vaultVersion } = useVaultOption();
  const [showVaultPosition, setShowVaultPosition] = useState(false);

  // TODO: If active page is root, render access treasury button
  return (
    <>
      <FooterContainer
        screenHeight={screenHeight}
        showVaultPosition={showVaultPosition}
      >
        <FrameBar bottom={width <= sizes.md ? 104 : 0} height={4} />
        {/** Mobile */}
        <AccountStatus
          variant="mobile"
          vault={vaultOption ? { vaultOption, vaultVersion } : undefined}
          showVaultPositionHook={setShowVaultPosition}
          showAirdropButton={false}
        />
      </FooterContainer>
      <MobileFooterOffsetContainer showVaultPosition={showVaultPosition} />
    </>
  );
};

export default Footer;
