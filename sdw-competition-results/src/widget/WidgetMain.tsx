import { Container } from '@mui/material';
import { useStoreCache } from 'hooks';
import { useWidgetConfig } from 'lib/WidgetConfigContext';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from 'store';
import { fetchAccessToken } from 'store/authSlice';

const WidgetMain: React.FC = () => {
  const config = useWidgetConfig();
  const { handleMasterDataInfo } = useStoreCache();
  const navigate = useNavigate();
  const { token, loading, error, expiresAt } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { id: routeId } = useParams<{ id: string }>();
  useEffect(() => {
    if (config) {
      if (!loading && (!token || !expiresAt || Date.now() > expiresAt)) {
        dispatch(fetchAccessToken(config));
      }
    } else {
      console.log('Config is not available!');
    }
  }, [dispatch, config, token, expiresAt]);

  // ✅ Redirect when config.entityId is present but URL is missing it
  useEffect(() => {
    if (config?.entityId && !routeId) {
      const basePath = config.entityLevel === 'competition' ? 'competition' : 'event';
      navigate(`/sdw/widget/${basePath}/${config.entityId}`, { replace: true });
    }
  }, [config?.entityId, routeId, config?.entityLevel, navigate]);

  useEffect(() => {
    handleMasterDataInfo();
  }, [config.language]);

  if (loading) return <div>Loading widget...</div>;
  if (error) return <div>Failed to load: {error}</div>;
  return (
    <>
      <Helmet>
        <title>{`SDW Widget | ${config.entityLevel} ${config.entityId}`}</title>
        <meta
          name="description"
          content={`SDW Widget for ${config.entityLevel} ${config.entityId}`}
        />
      </Helmet>
      <Container maxWidth={false}>
        <Outlet />
      </Container>
    </>
  );
};
export default WidgetMain;
