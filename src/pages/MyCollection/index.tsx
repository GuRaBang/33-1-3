import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Header,
  Main,
  PageTitle,
  SearchInput,
  Footer,
  Dropdown,
  SearchResultText,
  VinylItems,
} from '@/common/components';
import {
  Collection_SORT_CONTENT,
  SORT_LABEL,
  VIEW_CONTENT,
  VIEW_LABEL,
} from '@/utils/constants/dropdown';
import { ResultViewProps } from '@/common/components/AlbumInfo/AlbumInfo';
import { mockUsersData } from '@/utils/mocks/mockInfo';
import styled from 'styled-components';
import axios from 'axios';
import { sortItems } from '@/utils/sortItems';
import processResult from '@/utils/functions/processResult';
import {
  ProcessedResult,
  RawResult,
  CollectionData,
  UserData,
} from '@/types/data';

const SECRET = import.meta.env.VITE_API_SECRET;
const KEY = import.meta.env.VITE_API_KEY;

let collectionItems: undefined | ProcessedResult[];

export default function MyCollection() {
  const { userid, collectionid } = useParams();
  const [searchParams] = useSearchParams();
  // const [itemCount, setItemCount] = useState<number>(0);
  const [result, setResult] = useState<ProcessedResult[]>([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [count, setCount] = useState<number>();
  const [searchWord, setSearchWord] = useState<string>();
  // const { collections } = mockUsersData.find(
  //   ({ id }) => id === +(userid as string)
  // ) as UserData;
  // const { title, albums } = collections.find(
  //   ({ id }) => id === +(collectionid as string)
  // ) as CollectionData;

  // console.log(collections, title, albums);
  const validator = (data: string | Array<string>) => {
    if (typeof data === 'string') {
      return data !== '';
    }
    if (Array.isArray(data)) {
      return data.length !== 0;
    }
    return false;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const matchItems = collectionItems?.filter(
      ({ titleInfo: { title, artist } }) => {
        const regexp = new RegExp(e.target.value, 'i');
        return title.search(regexp) !== -1 || artist.search(regexp) !== -1;
      }
    );
    setResult(matchItems as ProcessedResult[]);
    setCount(matchItems?.length);
    setSearchWord(e.target.value);
  }
  const url = `http://localhost:3313/collection/${collectionid}`;

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await axios.get(url);
        const result = res.data;
        const { vinylsInfo, collectionTitle } = result;

        const processedResult = vinylsInfo.map(
          ({
            imgUrl,
            title,
            artist,
            released,
            genre,
          }: {
            imgUrl: string;
            title: string;
            artist: string;
            released: string;
            genre: string[];
          }) => {
            return {
              titleInfo: { title, artist },
              detailInfo: [
                {
                  infoName: 'Released',
                  infoContent: released,
                  isValid: validator(released),
                },
                {
                  infoName: 'Genre',
                  infoContent: genre,
                  isValid: validator(genre),
                },
              ],
              imgUrl,
            };
          }
        );
        setCollectionTitle(collectionTitle);
        setResult(processedResult);
        // setResult(() => {
        //   collectionItems = sortItems(
        //     processResult(datas),
        //     searchParams.get('sort') as
        //       | 'title'
        //       | 'artist'
        //       | 'count'
        //       | 'Released'
        //       | 'update'
        //   );
        //   return collectionItems;
        // });
      } catch (error) {
        console.error(error);
      }
    }

    fetchResults();
  }, [userid, collectionid]);

  const [_view, sort] = [searchParams.get('view'), searchParams.get('sort')];
  const view = _view ?? 'block';
  console.log(result);

  return (
    <>
      <Header />
      <MainWrapper>
        <PageTitle>{collectionTitle}</PageTitle>
        <CenterSearchInput
          page="나의 콜렉션"
          handleSubmit={(e) => {
            e.preventDefault();
          }}
          handleChange={handleChange}
        />
        <SearchResultWrapper>
          {count !== undefined && searchWord !== '' && (
            <SearchResultText searchWord={searchWord} resultCount={count} />
          )}
          <Dropdown
            content={Collection_SORT_CONTENT}
            dropKind="sort"
            label={SORT_LABEL}
          />
          <Dropdown content={VIEW_CONTENT} dropKind="view" label={VIEW_LABEL} />
        </SearchResultWrapper>

        <VinylItems
          searchResult={sortItems(
            result,
            sort as 'title' | 'artist' | 'count' | 'Released' | 'update'
          )}
          page={'collection'}
          view={view as ResultViewProps['view']}
        />
      </MainWrapper>
      <Footer />
    </>
  );
}

const MainWrapper = styled(Main)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  margin-top: 56px;
`;

const CenterSearchInput = styled(SearchInput)`
  width: fit-content;
  align-self: center;
  margin-top: var(--space-xxl);
`;

const SearchResultWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: var(--space-bs);
  width: 828px;
  height: 34px;
  margin: 0 auto;
  margin-top: 36px;

  > div:first-child {
    margin-right: auto;
  }

  > div:nth-last-of-type(2) {
    position: absolute;
    top: 0;
    right: 134px;
  }

  > div:last-child {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
