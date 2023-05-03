import { useState } from "react";
import * as Styled from "./styles";
import { Modal } from "../Modal";

export const AntePayTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Styled.Button as="button" onClick={handleOpenModal}>
        Ante Pay Table
      </Styled.Button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Styled.Container>
            <Styled.Title>Ante</Styled.Title>
            <Styled.Table>
              <Styled.Thead>
                <tr>
                  <Styled.Th>Hand</Styled.Th>
                  <Styled.Th>Payout</Styled.Th>
                </tr>
              </Styled.Thead>
              <tbody>
                <tr>
                  <Styled.Td>Royal Flush</Styled.Td>
                  <Styled.Td>100:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Straight Flush</Styled.Td>
                  <Styled.Td>20:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Four of a Kind</Styled.Td>
                  <Styled.Td>20:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Full House</Styled.Td>
                  <Styled.Td>3:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Flush</Styled.Td>
                  <Styled.Td>2:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Straight</Styled.Td>
                  <Styled.Td>1:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Three of a Kind</Styled.Td>
                  <Styled.Td>1:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Two Pairs</Styled.Td>
                  <Styled.Td>1:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>One Pair</Styled.Td>
                  <Styled.Td>1:1</Styled.Td>
                </tr>
              </tbody>
            </Styled.Table>
          </Styled.Container>
        </Modal>
      )}
    </>
  );
};

export const AAPayTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Styled.Button as="button" onClick={handleOpenModal}>
        AA Pay Table
      </Styled.Button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Styled.Container>
            <Styled.Title>AA</Styled.Title>
            <Styled.Table>
              <Styled.Thead>
                <tr>
                  <Styled.Th>Hand</Styled.Th>
                  <Styled.Th>Payout</Styled.Th>
                </tr>
              </Styled.Thead>
              <tbody>
                <tr>
                  <Styled.Td>Royal Flush</Styled.Td>
                  <Styled.Td>100:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Straight Flush</Styled.Td>
                  <Styled.Td>50:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Four of a Kind</Styled.Td>
                  <Styled.Td>40:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Full House</Styled.Td>
                  <Styled.Td>30:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Flush</Styled.Td>
                  <Styled.Td>20:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Straight</Styled.Td>
                  <Styled.Td>7:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Three of a Kind</Styled.Td>
                  <Styled.Td>7:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Two Pairs</Styled.Td>
                  <Styled.Td>7:1</Styled.Td>
                </tr>
                <tr>
                  <Styled.Td>Pair of Aces</Styled.Td>
                  <Styled.Td>7:1</Styled.Td>
                </tr>
              </tbody>
            </Styled.Table>
          </Styled.Container>
        </Modal>
      )}
    </>
  );
};
