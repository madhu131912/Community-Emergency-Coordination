from app.database import SessionLocal
from app.models import Role, Society, Block, Flat

db = SessionLocal()

# ---------- Roles ----------
roles = [
    Role(role_name="Resident"),
    Role(role_name="Volunteer"),
    Role(role_name="Guardian"),
    Role(role_name="Security"),
    Role(role_name="Admin"),
]

# ---------- Societies ----------
society1 = Society(
    society_name="Green Valley Apartments",
    address="Madhapur Main Road",
    city="Hyderabad",
    state="Telangana",
    pincode="500081",
    status="active"
)

society2 = Society(
    society_name="Sky Residency",
    address="Gachibowli Circle",
    city="Hyderabad",
    state="Telangana",
    pincode="500032",
    status="active"
)

society3 = Society(
    society_name="Lotus Heights",
    address="KPHB Colony",
    city="Hyderabad",
    state="Telangana",
    pincode="500072",
    status="active"
)

# ---------- Add Roles ----------
for role in roles:
    existing_role = db.query(Role).filter(Role.role_name == role.role_name).first()
    if not existing_role:
        db.add(role)

db.commit()

# ---------- Add Societies ----------
societies = [society1, society2, society3]

for society in societies:
    existing_society = db.query(Society).filter(Society.society_name == society.society_name).first()
    if not existing_society:
        db.add(society)

db.commit()

# ---------- Fetch societies again after commit ----------
green_valley = db.query(Society).filter(Society.society_name == "Green Valley Apartments").first()
sky_residency = db.query(Society).filter(Society.society_name == "Sky Residency").first()
lotus_heights = db.query(Society).filter(Society.society_name == "Lotus Heights").first()

# ---------- Blocks ----------
blocks = [
    Block(society_id=green_valley.id, block_name="Tower A", description="Main family block"),
    Block(society_id=green_valley.id, block_name="Tower B", description="Premium flats"),
    Block(society_id=sky_residency.id, block_name="Block A", description="East wing"),
    Block(society_id=sky_residency.id, block_name="Block B", description="West wing"),
    Block(society_id=lotus_heights.id, block_name="Tower X", description="Luxury tower"),
]

for block in blocks:
    existing_block = db.query(Block).filter(
        Block.society_id == block.society_id,
        Block.block_name == block.block_name
    ).first()
    if not existing_block:
        db.add(block)

db.commit()

# ---------- Fetch blocks again ----------
tower_a = db.query(Block).filter(Block.block_name == "Tower A").first()
tower_b = db.query(Block).filter(Block.block_name == "Tower B").first()
block_a = db.query(Block).filter(Block.block_name == "Block A").first()
block_b = db.query(Block).filter(Block.block_name == "Block B").first()
tower_x = db.query(Block).filter(Block.block_name == "Tower X").first()

# ---------- Flats ----------
flats = [
    Flat(block_id=tower_a.id, flat_number="A101", floor_number=1),
    Flat(block_id=tower_a.id, flat_number="A102", floor_number=1),
    Flat(block_id=tower_b.id, flat_number="B201", floor_number=2),
    Flat(block_id=block_a.id, flat_number="A301", floor_number=3),
    Flat(block_id=block_b.id, flat_number="B401", floor_number=4),
    Flat(block_id=tower_x.id, flat_number="X501", floor_number=5),
]

for flat in flats:
    existing_flat = db.query(Flat).filter(
        Flat.block_id == flat.block_id,
        Flat.flat_number == flat.flat_number
    ).first()
    if not existing_flat:
        db.add(flat)

db.commit()
db.close()

print("Sample data inserted successfully!")