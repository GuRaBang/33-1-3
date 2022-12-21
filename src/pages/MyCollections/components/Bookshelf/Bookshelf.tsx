import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@/common/components';
import { useRecoilState } from 'recoil';
import {
  dialogState,
  editCollectionDialogState,
  deleteCollectionDialogState,
} from '@/recoil/globalState';
import { useState, useLayoutEffect } from 'react';

export interface BookshelfProps {
  userId: string;
  collectionId: string;
  title: string;
  count: number;
  step: number;
}

const Wrapper = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  margin-left: 8px;
`;

const IconButtons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
  margin-right: 8px;
`;

const Bookshelf = ({
  userId,
  collectionId,
  title,
  count,
  step,
  ...props
}: BookshelfProps) => {
  const [isUserCollections, setIsUserCollections] = useState<boolean>(false);
  const { userid } = useParams();
  const [_, setDialog] = useRecoilState(dialogState);
  const imgIdx = Math.min(Math.ceil(count / step), 5);

  useLayoutEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get('http://localhost:3313/auth', {
          withCredentials: true,
        });
        const {
          data: { isLogin, userId },
        } = res;

        if (isLogin && userId === userid) {
          setIsUserCollections(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkAuth();
  }, [isUserCollections]);

  return (
    <Wrapper style={{ width: '520px', height: 'fit-content' }}>
      <Title>{title}</Title>
      {isUserCollections && (
        <IconButtons>
          <IconButton
            width={22}
            height={22}
            iconType="pencil"
            clickHandler={() => setDialog(editCollectionDialogState)}
          />
          <IconButton
            width={22}
            height={22}
            iconType="minus"
            clickHandler={() => setDialog(deleteCollectionDialogState)}
          />
        </IconButtons>
      )}
      <Link
        to={`/mycollection/${userId}/${collectionId}`}
        aria-label={`${title} 콜렉션으로 이동`}
      >
        <img
          width="520px"
          height="130px"
          src={`/assets/shelf${imgIdx}.svg`}
          alt=""
          {...props}
        />
      </Link>
    </Wrapper>
  );
};

Bookshelf.defaultProps = {
  width: '520px',
  height: '130px',
  step: 10,
};

export default Bookshelf;
