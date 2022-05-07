import { Grid } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useCallback, useMemo, useState } from 'react';
import EditTemplateModal from '../components/epic7/templatesetting/EditTemplateModal';
import TemplatePaper from '../components/epic7/templatesetting/TemplatePaper';
import ActionButtons from '../components/epic7/templatesetting/ActionButtons';
import { personTemplatesState, selectedTemplateIdState } from '../store/epic7/template';
import { getInitialPersonTemplate } from '../utils/epic7';
import { PersonTemplate } from '../types/epic7';
import { importFile } from '../utils/file';
import { handleOCR } from '../utils/OCR';

const TemplateSetting = () => {
  const [personTemplates, setPersonTemplates] = useRecoilState(personTemplatesState);

  // recoil数据同步
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedTemplateId = useRecoilValue(selectedTemplateIdState);

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
        return pre.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              status: 'deleted',
            };
          }
          return item;
        });
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
      setEditId('');
    },
    [setPersonTemplates]
  );

  const handleClose = useCallback(() => {
    setEditId('');
  }, []);

  const publishedTemplates = personTemplates.filter((item) => item.status === 'published');

  const handleUpload = async () => {
    const file = await importFile('.png, .jpg, .bmp, .pbm');
    const reader = new FileReader();
    reader.onload = async () => {
      console.log(reader.result);
      const text = await handleOCR(reader.result as string);
      console.log(text);
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <>
      <ActionButtons onAdd={handleAdd} onUpload={handleUpload} />
      <Grid container spacing={1}>
        {publishedTemplates.map((template) => {
          return (
            <Grid item key={template.id} xs={12}>
              <TemplatePaper
                onDelete={handleDelete}
                onEdit={handleEdit}
                template={template}
                showDelete={publishedTemplates.length > 1 && template.id !== selectedTemplateId}
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
