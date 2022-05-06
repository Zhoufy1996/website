import { Grid } from '@mui/material';
import { useRecoilState } from 'recoil';

import { useCallback, useMemo, useState } from 'react';
import EditTemplateModal from '../components/epic7/templatesetting/EditTemplateModal';
import TemplatePaper from '../components/epic7/templatesetting/TemplatePaper';
import ActionButtons from '../components/epic7/templatesetting/ActionButtons';
import { personTemplatesState } from '../store/epic7/template';
import { getInitialPersonTemplate } from '../utils/epic7';
import { PersonTemplate } from '../types/epic7';

const TemplateSetting = () => {
  const [personTemplates, setPersonTemplates] = useRecoilState(personTemplatesState);

  const [editId, setEditId] = useState<string>('');

  const handleEdit = useCallback(
    (id?: string) => {
      if (id == null) {
        const personTemplate = getInitialPersonTemplate();
        setPersonTemplates((pre) => {
          return [...pre, personTemplate];
        });
        setEditId(personTemplate.id);
      } else {
        setEditId(id);
      }
    },
    [setPersonTemplates]
  );

  const handleAdd = useCallback(() => {
    handleEdit();
  }, [handleEdit]);

  const handleDelete = useCallback(
    (id: string) => {
      setPersonTemplates((pre) => {
        return pre.filter((item) => item.id !== id);
      });
    },
    [setPersonTemplates]
  );

  const editTemplate = useMemo(
    () =>
      personTemplates.find((item) => {
        return item.id === editId;
      }),
    [personTemplates, editId]
  );

  const editModalOpen = useMemo(() => {
    return editTemplate != null;
  }, [editTemplate]);

  const handleEditTemplate = useCallback(
    (value) => {
      setPersonTemplates((pre) => {
        return pre.map((item) => {
          if (item.id === value.id) {
            return {
              ...value,
              status: 'published',
            };
          }
          return item;
        });
      });
    },
    [setPersonTemplates]
  );

  const handleClose = useCallback(() => {
    setEditId('');
  }, []);

  return (
    <>
      <ActionButtons onAdd={handleAdd} />
      <Grid container spacing={1}>
        {personTemplates.map((template) => {
          return (
            <Grid item key={template.id} xs={12}>
              <TemplatePaper
                onDelete={handleDelete}
                onEdit={handleEdit}
                template={template}
                showDelete={personTemplates.length > 1}
              />
            </Grid>
          );
        })}
      </Grid>
      {editModalOpen && (
        <EditTemplateModal
          onClose={handleClose}
          defaultTemplate={editTemplate as PersonTemplate}
          onOk={handleEditTemplate}
        />
      )}
    </>
  );
};

export default TemplateSetting;
