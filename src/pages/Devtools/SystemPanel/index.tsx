import { memo } from 'react';
import { Button, Col, Empty, Row, Tooltip } from 'antd';
import { useSocketMessageStore } from '@/store/socket-message';
import SystemContent from '@/components/SystemContent';
import { ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

const SystemPanel = memo(() => {
  const [systemMsg, refresh] = useSocketMessageStore(
    useShallow((state) => [state.systemMsg, state.refresh]),
  );

  const { t } = useTranslation();

  if (systemMsg.length === 0) {
    return <Empty description={false} />;
  }
  return (
    <div className="system-panel">
      <Row justify="end">
        <Col>
          <Tooltip title={t('common.refresh')}>
            <Button
              onClick={() => {
                refresh('system');
              }}
            >
              <ReloadOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <SystemContent data={systemMsg} />
    </div>
  );
});

export default SystemPanel;
