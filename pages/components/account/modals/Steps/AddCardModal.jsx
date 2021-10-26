import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'

import styles from '../../../../../styles/components/Account/modals/trade-modules/AddCardModal.module.scss'
import InputMask from 'react-input-mask'

const AddCardModal = ({ isOpen, toggle }) => {
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    date: '',
    cvv: '',
  })

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      className={styles.addCardModal}
      unmountOnClose={false}
    >
      <a className={`closeBtn curspor-pointer`} onClick={() => toggle()}>
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2407 9.50014L18.6389 2.10154C19.1204 1.6203 19.1204 0.842184 18.6389 0.360936C18.1577 -0.120312 17.3796 -0.120312 16.8983 0.360936L9.49989 7.75953L2.10167 0.360936C1.62021 -0.120312 0.842336 -0.120312 0.361098 0.360936C-0.120366 0.842184 -0.120366 1.6203 0.361098 2.10154L7.75932 9.50014L0.361098 16.8987C-0.120366 17.38 -0.120366 18.1581 0.361098 18.6393C0.600928 18.8794 0.916268 19 1.23138 19C1.5465 19 1.86161 18.8794 2.10167 18.6393L9.49989 11.2407L16.8983 18.6393C17.1384 18.8794 17.4535 19 17.7686 19C18.0837 19 18.3988 18.8794 18.6389 18.6393C19.1204 18.1581 19.1204 17.38 18.6389 16.8987L11.2407 9.50014Z"
            fill="white"
          />
        </svg>
      </a>
      <ModalHeader>Link your card</ModalHeader>
      <ModalBody>
        <Form
          className={styles.addCardForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label}>Name on card</Label>
            <input
              className={`${styles.Input} text-uppercase`}
              placeholder="Name"
              onChange={(e) =>
                setCardInfo({
                  ...cardInfo,
                  name: e.target.value,
                })
              }
              value={cardInfo.name}
            />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.label}>Card number</Label>
            <InputMask
              className={`${styles.Input} text-uppercase`}
              placeholder="XXXX XXXX XXXX XXXX"
              mask="9999 9999 9999 9999"
              onChange={(e) =>
                setCardInfo({
                  ...cardInfo,
                  number: e.target.value,
                })
              }
              value={cardInfo.number}
            />
          </FormGroup>
          <FormGroup
            className={`${styles.formGroup} ${styles.formGroupInline} d-flex`}
          >
            <div>
              <Label className={styles.label}>Card number</Label>
              <InputMask
                className={`${styles.Input} ${styles.cardDate} text-uppercase`}
                placeholder="MM/YY"
                mask={'99/99'}
                onChange={(e) =>
                  setCardInfo({
                    ...cardInfo,
                    date: e.target.value,
                  })
                }
                value={cardInfo.date}
              />
            </div>
            <div>
              <Label className={styles.label}>Card number</Label>
              <InputMask
                className={`${styles.Input} ${styles.cvv} text-uppercase`}
                placeholder="123"
                mask="999"
                onChange={(e) =>
                  setCardInfo({
                    ...cardInfo,
                    cvv: e.target.value,
                  })
                }
                value={cardInfo.cvv}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Button color="primary" className={styles.submitBtn}>
              Add card
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className={styles.footer}>
        <svg
          width="13"
          height="15"
          viewBox="0 0 13 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8125 5.625H10.875V4.37499C10.875 1.9626 8.91242 0 6.5 0C4.08758 0 2.12501 1.9626 2.12501 4.37499V5.625H1.18751C1.01478 5.625 0.875 5.76478 0.875 5.93751V13.75C0.875 14.4394 1.4356 15 2.12501 15H10.875C11.5644 15 12.125 14.4394 12.125 13.75V5.93751C12.125 5.76478 11.9852 5.625 11.8125 5.625ZM7.43568 12.153C7.44544 12.2412 7.41708 12.3297 7.35787 12.3959C7.29866 12.4622 7.21382 12.5 7.12502 12.5H5.87501C5.78621 12.5 5.70137 12.4622 5.64216 12.3959C5.58295 12.3297 5.55456 12.2412 5.56435 12.153L5.76148 10.3803C5.44136 10.1474 5.25002 9.77906 5.25002 9.375C5.25002 8.68562 5.81062 8.12499 6.50003 8.12499C7.18944 8.12499 7.75004 8.68559 7.75004 9.375C7.75004 9.77906 7.5587 10.1474 7.23857 10.3803L7.43568 12.153ZM8.99999 5.625H4.00001V4.37499C4.00001 2.99651 5.12152 1.875 6.5 1.875C7.87848 1.875 8.99999 2.99651 8.99999 4.37499V5.625Z"
            fill="#2D5569"
          />
        </svg>
        Processed by <a href="/">Humanbace</a>{' '}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.7"
            d="M8.00033 0C3.58334 0 0 3.57882 0 7.99611C0 12.4176 3.58334 16.0006 8.0003 16.0006C12.4197 16.0006 16 12.4176 16 7.99611C16 3.57882 12.4197 0 8.00033 0ZM8.57044 12.4477C8.38463 12.6131 8.16929 12.6962 7.92534 12.6962C7.67295 12.6962 7.45279 12.6145 7.26487 12.451C7.07665 12.2878 6.98236 12.0592 6.98236 11.7655C6.98236 11.505 7.07362 11.2857 7.25554 11.1081C7.43746 10.9304 7.66061 10.8415 7.92534 10.8415C8.18585 10.8415 8.40511 10.9304 8.58311 11.1081C8.7608 11.2857 8.84995 11.505 8.84995 11.7655C8.84962 12.055 8.75654 12.2824 8.57044 12.4477ZM10.8873 6.70377C10.7446 6.9685 10.575 7.19677 10.3784 7.38925C10.1823 7.58169 9.82965 7.90515 9.32064 8.35991C9.18029 8.48822 9.06736 8.60085 8.98274 8.69782C8.89811 8.79511 8.83487 8.88392 8.79359 8.96466C8.75202 9.04535 8.72012 9.12609 8.69752 9.20679C8.67492 9.28719 8.64091 9.42905 8.59482 9.63172C8.51653 10.0618 8.27047 10.2768 7.85695 10.2768C7.6419 10.2768 7.46121 10.2066 7.31393 10.066C7.16724 9.92535 7.09407 9.71664 7.09407 9.43958C7.09407 9.09233 7.14798 8.79144 7.2555 8.53698C7.36243 8.28248 7.50548 8.05932 7.68318 7.86688C7.86117 7.67443 8.10089 7.44613 8.40297 7.1814C8.66769 6.94979 8.85895 6.77513 8.9767 6.65735C9.09474 6.5393 9.19385 6.408 9.27425 6.26342C9.35529 6.11855 9.39504 5.96164 9.39504 5.7921C9.39504 5.46112 9.27248 5.18224 9.02612 4.95486C8.78007 4.72748 8.46262 4.61362 8.07381 4.61362C7.61875 4.61362 7.28384 4.72837 7.0688 4.95786C6.85376 5.18735 6.67217 5.52526 6.52308 5.97191C6.38213 6.43934 6.11529 6.67302 5.72285 6.67302C5.49124 6.67302 5.2958 6.5914 5.13648 6.42815C4.97746 6.2649 4.89795 6.08813 4.89795 5.8978C4.89795 5.50506 5.02414 5.10691 5.27624 4.70365C5.52863 4.30039 5.89666 3.96638 6.38061 3.70194C6.86428 3.43721 7.42901 3.30468 8.07381 3.30468C8.67344 3.30468 9.2026 3.4155 9.66159 3.63688C10.1206 3.85793 10.4753 4.15882 10.7256 4.53948C10.9756 4.91984 11.1009 5.33337 11.1009 5.78002C11.1015 6.13093 11.0301 6.43904 10.8873 6.70377Z"
            fill="#8AAAB4"
          />
        </svg>
      </ModalFooter>
    </Modal>
  )
}
export default AddCardModal
