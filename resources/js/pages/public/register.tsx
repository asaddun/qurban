import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Alert,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Typography,
} from 'antd';
import {
    DeleteOutlined,
    LoadingOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { store, check } from '@/routes/register';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface QurbanType {
    id: number;
    name: string;
    price: number;
}

interface Props {
    qurbanTypes: QurbanType[];
}

interface FormValues {
    participant: {
        id?: number;
        name: string;
        phone: string;
        address?: string;
        request_part?: string;
        dist_cow?: number;
        dist_goat?: number;
        notes?: string;
    };

    shohibuls: {
        name: string;
        qurban_type_id: number;
    }[];
}

export default function Register({ qurbanTypes }: Props) {
    const [participantId, setParticipantId] = useState<number | null>(null);
    const [checkingPhone, setCheckingPhone] = useState(false);
    const [form] = Form.useForm<FormValues>();

    const phone = Form.useWatch(['participant', 'phone'], form);

    useEffect(() => {
        if (!phone || phone.length < 10) {
            setParticipantId(null);
            return;
        }

        const timer = setTimeout(() => {
            checkParticipant(phone);
        }, 500);

        return () => clearTimeout(timer);
    }, [phone]);

    const checkParticipant = async (phone: string) => {
        setCheckingPhone(true);

        try {
            const response = await axios.get(check().url, {
                params: { phone },
            });

            setParticipantId(response.data.participant?.id ?? null);
        } finally {
            setCheckingPhone(false);
        }
    };

    useEffect(() => {
        if (participantId) {
            form.setFieldValue(['participant', 'id'], participantId);
        }
    }, [participantId]);

    const submit = (values: FormValues) => {
        router.visit(store(), {
            data: values as Record<string, any>,
        });
    };

    return (
        <>
            <Head title="Pendaftaran" />
            <Row justify="center" style={{ padding: 32 }}>
                <Col xs={24} sm={24} md={22} lg={18} xl={14}>
                    <Card>
                        <Title level={2} style={{ marginBottom: 0 }}>
                            Pendaftaran Qurban
                        </Title>

                        <Text type="secondary">
                            Silakan isi data pendaftar dan daftar shohibul
                            qurban.
                        </Text>

                        <Divider />

                        <Form<FormValues>
                            form={form}
                            layout="vertical"
                            onFinish={submit}
                            initialValues={{
                                participant: {
                                    dist_cow: 0,
                                    dist_goat: 0,
                                },
                                shohibuls: [
                                    {
                                        name: '',
                                        qurban_type_id: undefined as any,
                                    },
                                ],
                            }}
                        >
                            {/* ==========================
                            DATA PENDAFTAR
                        ========================== */}

                            <Title level={4}>Data Pendaftar</Title>

                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        name={['participant', 'id']}
                                        hidden
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nama"
                                        name={['participant', 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Nama peserta wajib diisi',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nama pendaftar" />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="No. HP"
                                        name={['participant', 'phone']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nomor HP wajib diisi',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="08xxxxxxxxxx"
                                            suffix={
                                                checkingPhone ? (
                                                    <LoadingOutlined />
                                                ) : (
                                                    <span />
                                                )
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {!participantId ? (
                                <Form.Item
                                    label="Alamat"
                                    name={['participant', 'address']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Alamat wajib diisi',
                                        },
                                    ]}
                                >
                                    <TextArea rows={3} />
                                </Form.Item>
                            ) : (
                                <Alert
                                    title="Informasi"
                                    description="Nomor anda sudah terdaftar sebagai peserta
                                    qurban, silahkan tambahkan Shohibul Qurban baru
                                    yang ingin didaftarkan."
                                    type="info"
                                    showIcon
                                />
                            )}

                            <Divider />

                            <Title level={4}>Jenis Qurban</Title>

                            <ul>
                                {qurbanTypes.map((item) => (
                                    <li key={item.id}>
                                        {item.name} -{' '}
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            maximumFractionDigits: 0,
                                        }).format(item.price)}
                                    </li>
                                ))}
                            </ul>

                            <Divider />

                            {/* ==========================
                            SHOHIBUL
                        ========================== */}

                            <Space
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    marginBottom: 16,
                                }}
                            >
                                <Title level={4} style={{ margin: 0 }}>
                                    Shohibul Qurban
                                </Title>
                            </Space>

                            <Form.List name="shohibuls">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <Card
                                                key={field.key}
                                                size="small"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <Row gutter={16} align="middle">
                                                    <Col xs={24} md={11}>
                                                        <Form.Item
                                                            label="Nama Shohibul"
                                                            name={[
                                                                field.name,
                                                                'name',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Nama wajib diisi',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Nama Shohibul" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} md={11}>
                                                        <Form.Item
                                                            label="Jenis Qurban"
                                                            name={[
                                                                field.name,
                                                                'qurban_type_id',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Pilih jenis qurban',
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                placeholder="Pilih jenis qurban"
                                                                options={qurbanTypes.map(
                                                                    (item) => ({
                                                                        value: item.id,
                                                                        label: `${item.name} - ${new Intl.NumberFormat(
                                                                            'id-ID',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'IDR',
                                                                                maximumFractionDigits: 0,
                                                                            },
                                                                        ).format(
                                                                            item.price,
                                                                        )}`,
                                                                    }),
                                                                )}
                                                            />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col
                                                        xs={24}
                                                        md={2}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <Button
                                                            danger
                                                            type="text"
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            disabled={
                                                                fields.length ===
                                                                1
                                                            }
                                                            onClick={() =>
                                                                remove(
                                                                    field.name,
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card>
                                        ))}

                                        <Button
                                            type="dashed"
                                            block
                                            icon={<PlusOutlined />}
                                            onClick={() =>
                                                add({
                                                    name: '',
                                                    qurban_type_id: undefined,
                                                })
                                            }
                                        >
                                            Tambah Shohibul
                                        </Button>
                                    </>
                                )}
                            </Form.List>

                            <Divider />

                            {/* ==========================
                            PERMINTAAN
                        ========================== */}
                            {!participantId ? (
                                <>
                                    <Title level={4}>
                                        Permintaan & Distribusi
                                    </Title>

                                    <Form.Item
                                        label="Permintaan Bagian"
                                        name={['participant', 'request_part']}
                                    >
                                        <Input placeholder="Contoh: Hati, Paha, dll." />
                                    </Form.Item>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Distribusi Sendiri (Kantung Sapi)"
                                                name={[
                                                    'participant',
                                                    'dist_cow',
                                                ]}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Distribusi Sendiri (Kantung Kambing)"
                                                name={[
                                                    'participant',
                                                    'dist_goat',
                                                ]}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        label="Catatan"
                                        name={['participant', 'notes']}
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>

                                    <Divider />
                                </>
                            ) : (
                                <>
                                    <Alert
                                        title="Informasi"
                                        description="Harap menghubungi Panitia untuk melakukan perubahan data Permintaan dan Distribusi."
                                        type="info"
                                        showIcon
                                    />

                                    <Divider />
                                </>
                            )}
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    color="green"
                                    variant="solid"
                                    htmlType="submit"
                                    size="large"
                                    block
                                >
                                    Daftar Qurban
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
